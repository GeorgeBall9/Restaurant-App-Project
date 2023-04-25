// imports
import {initializeApp} from "firebase/app";

// db imports
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    updateDoc,
    where,
    orderBy
} from "firebase/firestore";

// auth imports
import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";

// firebase config
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// initialise app
const app = initializeApp(firebaseConfig);

// initialise firestore database
const db = getFirestore(app);

// auth functions
export const auth = getAuth();

// sign up with email and password
export const signUpAuthUserWithEmailAndPassword = async (displayName, email, password) => {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    return await createNewUserInDatabase({...user, displayName});
};

// sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error("User not found");
    }
};

// sign in with Google popup
const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
    const {user} = await signInWithPopup(auth, googleAuthProvider);
    return await createNewUserInDatabase(user);
};

// sign in with Facebook popup
const facebookAuthProvider = new FacebookAuthProvider();

export const signInWithFacebookPopup = async () => {
    const {user} = await signInWithPopup(auth, facebookAuthProvider);
    return await createNewUserInDatabase(user);
};

// sign out auth user
export const signOutAuthUser = async () => {
    await signOut(auth);
};

// database functions

// create user doc - userData param includes displayName, email
export const createUserDoc = async (userData, userId) => {
    const userDocRef = doc(db, "users", userId);

    await setDoc(userDocRef, {...userData}, {merge: true});

    console.log("User document written with ID: ", userDocRef.id);
};

// create user doc in db after successful sign up
export const createNewUserInDatabase = async (user) => {
    const {uid, displayName, email} = user;
    const userData = await getUserFromUserId(uid);

    if (userData) {
        return userData;
    }

    const iconColour = getRandomColour();

    const data = {displayName, email, iconColour, bookmarks: [], checkedIn: []};
    await createUserDoc(data, uid);

    return {...data, id: uid};
};

// helper function to generate random icon colour for user
const getRandomColour = () => {
    const colours = ["#FF2E63", "#B3E5BE", "#AA77FF", "#19A7CE", "#FE6244", "#FFDD83", "#E6A4B4", "#5D9C59",
        "#E21818"];

    const randomIndex = Math.floor(Math.random() * colours.length);
    return colours[randomIndex];
};

// get user details from db
export const getUserFromUserId = async (userId) => {
    if (!userId) return;

    try {
        const docRef = await doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        return docSnap.exists() ? {id: docSnap.id, ...docSnap.data()} : null;
    } catch (error) {
        console.error(error);
        console.log("blue")
    }
};

// update user display name
export const updateUserDisplayName = async (userId, displayName) => {
    try {
        const docSnap = await doc(db, "users", userId);
        await updateDoc(docSnap, {displayName});
    } catch (error) {
        throw new Error("Document does not exist");
    }
};

// update user display name
export const updateUserEmailAddress = async (userId, email) => {
    try {
        const docSnap = await doc(db, "users", userId);
        await updateDoc(docSnap, {email});
    } catch (error) {
        throw new Error("Document does not exist");
    }
};

// update user display name
export const updateUserPhoneNumber = async (userId, phone) => {
    try {
        const docSnap = await doc(db, "users", userId);
        await updateDoc(docSnap, {phone});
    } catch (error) {
        throw new Error("Document does not exist");
    }
};

// update user icon colour
export const updateUserIconColour = async (userId, iconColour) => {
    try {
        const docSnap = await doc(db, "users", userId);
        await updateDoc(docSnap, {iconColour});
    } catch (error) {
        throw new Error("Document does not exist");
    }
};

// update user review count
export const updateUserReviewCount = async (userId, amount) => {
    const docData = await getUserFromUserId(userId);

    if (!docData) return;

    const updatedReviewCount = docData.reviews ? +docData.reviews + amount : 1;

    const docSnap = await doc(db, "users", userId);
    await updateDoc(docSnap, {reviews: updatedReviewCount});
};

// add user recommendation
export const addUserRecommendation = async (userId, restaurant) => {
    if (!userId || !restaurant) return;

    try {
        const docRef = await doc(db, "users", userId);

        await updateDoc(docRef, {
            recommendations: arrayUnion(restaurant.id)
        });

        await addInteractionToRestaurantDoc(restaurant, "recommendations");
    } catch (error) {
        console.log(error)
        throw new Error("Document does not exist");
    }
};

// remove user recommendation
export const removeUserRecommendation = async (userId, restaurantId) => {
    try {
        const docRef = await doc(db, "users", userId);

        await updateDoc(docRef, {
            recommendations: arrayRemove(restaurantId)
        });

        await removeInteractionFromRestaurantDoc(restaurantId, "recommendations");
    } catch (error) {
        throw new Error("Document does not exist");
    }
};

// add user bookmark
export const addUserBookmark = async (userId, restaurant) => {
    if (!userId || !restaurant) return;

    try {
        const docRef = await doc(db, "users", userId);

        await updateDoc(docRef, {
            bookmarks: arrayUnion(restaurant.id)
        });

        await addInteractionToRestaurantDoc(restaurant, "bookmarks");
    } catch (error) {
        console.log(error)
        throw new Error("Document does not exist");
    }
};

// remove user bookmark
export const removeUserBookmark = async (userId, restaurantId) => {
    try {
        const docRef = await doc(db, "users", userId);

        await updateDoc(docRef, {
            bookmarks: arrayRemove(restaurantId)
        });

        await removeInteractionFromRestaurantDoc(restaurantId, "bookmarks");
    } catch (error) {
        throw new Error("Document does not exist");
    }
};

// add checked in restaurant to user doc
export const addRestaurantCheckIn = async (userId, date, restaurant) => {
    try {
        const docSnap = await doc(db, "users", userId);

        const newCheckIn = {
            restaurantId: restaurant.id,
            date: +new Date(date)
        };

        await updateDoc(docSnap, {
            checkedIn: arrayUnion(newCheckIn)
        });

        await addInteractionToRestaurantDoc(restaurant, "checkIns");

        return newCheckIn;
    } catch (error) {
        console.log(error)
        throw new Error("Document does not exist");
    }
};

// validate restaurant check in
export const checkInExists = async (userId, date, restaurantId) => {
    const docRef = await doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    return docSnap.data().checkedIn
        .some(({restaurantId: storedRestaurantId, date: dateInt}) => {
            if (storedRestaurantId !== restaurantId) return false;
            const checkInDate = new Date(dateInt).toISOString().split("T")[0];
            return checkInDate === date;
        });
};

// add checked in restaurant to user doc
export const removeRestaurantCheckIn = async (userId, restaurantId) => {
    try {
        const docRef = await doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        const checkedInData = docSnap.data().checkedIn
            .filter(checkIn => {
                const now = new Date().toLocaleDateString();
                const dateString = new Date(checkIn.date).toLocaleDateString();

                return checkIn.restaurantId !== restaurantId || dateString !== now;
            });

        await updateDoc(docRef, {checkedIn: checkedInData});

        await removeInteractionFromRestaurantDoc(restaurantId, "checkIns");

        return checkedInData;
    } catch (error) {
        throw new Error("Document does not exist");
    }
};

// add restaurant review
export const addRestaurantReview = async (userId, restaurant, data) => {
    if (!userId || !restaurant || !data) return;

    const reviewsCollectionRef = collection(db, "reviews");

    const newReview = {
        userId,
        restaurantId: restaurant.id,
        ...data,
        reactions: {
            upVotes: [],
            downVotes: []
        },
        reported: false
    }

    const reviewDocRef = await addDoc(reviewsCollectionRef, newReview);
    console.log("Review document created with id:", reviewDocRef.id);

    await addInteractionToRestaurantDoc(restaurant, "reviews");

    await updateUserReviewCount(userId, 1);

    return {id: reviewDocRef.id, ...newReview};
};

// delete restaurant review
export const deleteRestaurantReview = async (userId, reviewId) => {
    if (!reviewId) return;

    const docRef = await doc(db, "reviews", reviewId);

    await updateUserReviewCount(userId, -1);

    await deleteDoc(docRef);
};

// update restaurant review
export const updateRestaurantReview = async (reviewId, updatedData) => {
    if (!reviewId || !updatedData) return;

    const docRef = await doc(db, "reviews", reviewId);

    await updateDoc(docRef, {
        ...updatedData
    });

    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? {id: docSnap.id, ...docSnap.data()} : null;
};

// report restaurant review
export const reportRestaurantReview = async (reviewId, description) => {
    if (!reviewId) return;

    const docRef = await doc(db, "reviews", reviewId);

    await updateDoc(docRef, {
        reported: true
    });

    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? {id: docSnap.id, ...docSnap.data()} : null;
};

// get all reviews by restaurant ID
export const getReviewsByRestaurantId = async (restaurantId) => {
    const reviewsCollectionRef = collection(db, "reviews");
    const q = query(reviewsCollectionRef,
        where("restaurantId", "==", restaurantId),
        orderBy("visitDate", "desc"));

    const querySnapshot = await getDocs(q);

    const reviews = [];

    querySnapshot.forEach((doc) => {
        reviews.push({id: doc.id, ...doc.data()});
    });

    return await Promise.all(reviews.map(async (review) => {
        const {iconColour, displayName, reviews} = await getUserFromUserId(review.userId);
        return {...review, iconColour, displayName, numberOfReviews: reviews};
    }));
};

// get all reviews by user ID
export const getReviewsByUserId = async (userId) => {
    const reviewsCollectionRef = collection(db, "reviews");
    const q = query(reviewsCollectionRef,
        where("userId", "==", userId),
        orderBy("visitDate", "desc"));

    const querySnapshot = await getDocs(q);

    const reviews = [];

    querySnapshot.forEach((doc) => {
        reviews.push({id: doc.id, ...doc.data()});
    });

    return await Promise.all(reviews.map(async (review) => {
        const {photoUrl, name: restaurantName} = await getRestaurantById(review.restaurantId);
        return {...review, photoUrl, restaurantName};
    }));
};

// add reaction to review
export const addUserReactionToReview = async (userId, reviewId, reaction) => {
    try {
        const docRef = await doc(db, "reviews", reviewId);
        const docSnap = await getDoc(docRef);

        const updatedReactions = docSnap.data().reactions;
        let userIdsReacted = updatedReactions[reaction];

        if (userIdsReacted.includes(userId)) {
            userIdsReacted = userIdsReacted.filter(id => id !== userId);
        } else {
            userIdsReacted.push(userId);

            if (reaction === "upVotes") {
                if (updatedReactions.downVotes.includes(userId)) {
                    updatedReactions.downVotes = updatedReactions.downVotes.filter(id => id !== userId);
                }
            } else if (updatedReactions.upVotes.includes(userId)) {
                updatedReactions.upVotes = updatedReactions.upVotes.filter(id => id !== userId);
            }
        }

        updatedReactions[reaction] = userIdsReacted;

        await updateDoc(docRef, {reactions: updatedReactions});

        return updatedReactions;
    } catch (error) {
        throw new Error("Document does not exist");
    }
};

// add restaurant data to database
export const createRestaurantDoc = async (restaurant) => {
    if (!restaurant) return;

    const docRef = await doc(db, "restaurants", restaurant.id);

    await setDoc(docRef, {...restaurant}, {merge: true});

    console.log("User document written with ID: ", docRef.id);
};

// get restaurant by id
export const getRestaurantById = async (id) => {
    const docRef = await doc(db, "restaurants", id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? {id: docSnap.id, ...docSnap.data()} : null;
};

// update restaurant doc
export const addInteractionToRestaurantDoc = async (restaurant, interaction) => {
    if (!restaurant || !interaction) return;

    let restaurantData = await getRestaurantById(restaurant.id);

    if (!restaurantData) {
        restaurantData = {...restaurant};
        restaurantData[interaction] = 1;
        await createRestaurantDoc(restaurantData);
    } else {
        const interactionCount = restaurantData[interaction];
        restaurantData[interaction] = interactionCount ? interactionCount + 1 : 1;
        await createRestaurantDoc(restaurantData);
    }
};

export const removeInteractionFromRestaurantDoc = async (restaurantId, interaction) => {
    if (!restaurantId || !interaction) return;

    let restaurantData = await getRestaurantById(restaurantId);

    if (!restaurantData) return;

    restaurantData[interaction]--;
    await createRestaurantDoc(restaurantData);
};

// send friend request
export const sendFriendRequestToUser = async (userId, friendId) => {
    if (!userId || !friendId) return;

    const userDocRef = await doc(db, "users", userId);
    const friendDocRef = await doc(db, "users", friendId);

    await updateDoc(userDocRef, {
        friends: arrayUnion({
            userId: friendId,
            status: "pending",
            date: +new Date()
        })
    });

    await updateDoc(friendDocRef, {
        friendRequests: arrayUnion({
            userId,
            date: +new Date()
        })
    });

    return await getFriendsByUserId(userId);
};

// get user friend requests and remove doc containing friend ID
const removeFriendRequest = async (userId, friendId) => {
    const userDocRef = await doc(db, "users", userId);

    const userData = await getUserFromUserId(userId);
    const requests = userData.friendRequests;
    const updatedRequests = requests.filter(request => request.userId !== friendId);

    console.log({userId, friendId, updatedRequests});

    await updateDoc(userDocRef, {friendRequests: updatedRequests});
};

// accept friend request
export const acceptFriendRequest = async (userId, friendId) => {
    if (!userId || !friendId) return;

    const userDocRef = await doc(db, "users", userId);
    const friendDocRef = await doc(db, "users", friendId);

    await updateDoc(userDocRef, {
        friends: arrayUnion({
            userId: friendId,
            status: "confirmed",
            date: +new Date()
        })
    });

    // get friend friends data and set status to confirmed and date to now
    const friendData = await getUserFromUserId(friendId);

    const friends = friendData.friends;

    const foundFriend = friends.find(({userId: id}) => id === userId);
    foundFriend.status = "confirmed";
    foundFriend.date = +new Date();

    await updateDoc(friendDocRef, {friends});

    // remove friend request from user
    await removeFriendRequest(userId, friendId);

    // return updated friends for user
    return await getFriendsByUserId(userId);
};

// reject friend request
export const rejectFriendRequest = async (userId, friendId) => {
    if (!userId || !friendId) return;

    // remove friend request from user
    await removeFriendRequest(userId, friendId);

    // remove pending friend from other user's friend array
    await removeFriendFromUserDoc(friendId, userId);

    // return updated friends for user
    return await getFriendsByUserId(userId);
};

// cancel friend request
export const cancelFriendRequest = async (userId, friendId) => {
    if (!userId || !friendId) return;

    // remove friend request from other user
    await removeFriendRequest(friendId, userId);

    // remove friend from user
    await removeFriendFromUserDoc(userId, friendId);

    return await getFriendsByUserId(userId);
};

// remove friend
export const removeFriend = async (userId, friendId) => {
    if (!userId || !friendId) return;

    await removeFriendFromUserDoc(userId, friendId);
    await removeFriendFromUserDoc(friendId, userId);

    return await getFriendsByUserId(userId);
};

const removeFriendFromUserDoc = async (userId, friendId) => {
    const friendData = await getUserFromUserId(userId);

    const friends = friendData.friends;
    const updatedFriends = friends.filter(({userId: id}) => id !== friendId);
    const userDocRef = await doc(db, "users", userId);

    await updateDoc(userDocRef, {friends: updatedFriends});
};

// get friend requests
export const getFriendRequestsByUserId = async (userId) => {
    if (!userId) return;

    const userData = await getUserFromUserId(userId);

    const friendRequests = userData.friendRequests;

    if (!friendRequests) {
        return null;
    }

    return await Promise
        .all(friendRequests
            .map(async ({userId: requestId}) => await getUserFromUserId(requestId)));
};

// get friends
export const getFriendsByUserId = async (userId) => {
    if (!userId) return;

    const userData = await getUserFromUserId(userId);

    const friends = userData.friends;

    if (!friends) {
        return null;
    }

    return await Promise.all(friends.map(async (friend) => {
        const {userId} = friend;
        const data = await getUserFromUserId(userId);
        return {...data, ...friend};
    }));
};