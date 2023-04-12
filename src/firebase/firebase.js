// imports
import {initializeApp} from "firebase/app";

// db imports
import {
    getFirestore,
    doc,
    addDoc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    collection,
    serverTimestamp,
    query,
    where
} from "firebase/firestore";

// auth imports
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
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
    const docRef = await doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? {id: docSnap.id, ...docSnap.data()} : null;
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

// get user bookmarks
export const getUserBookmarks = async (userId) => {
    try {
        const docRef = await doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return {id: docSnap.id, ...docSnap.data()};
    } catch (error) {
        throw new Error("Document does not exist");
    }
};

// add checked in restaurant to user doc
export const addRestaurantCheckIn = async (userId, restaurantId) => {
    try {
        const docSnap = await doc(db, "users", userId);

        const newCheckIn = {
            restaurantId,
            date: +new Date()
        };

        await updateDoc(docSnap, {
            checkedIn: arrayUnion(newCheckIn)
        });

        return newCheckIn;
    } catch (error) {
        throw new Error("Document does not exist");
    }
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

                return checkIn.restaurant.id !== restaurantId || dateString !== now;
            });

        await updateDoc(docRef, {checkedIn: checkedInData});

        return checkedInData;
    } catch (error) {
        throw new Error("Document does not exist");
    }
};

// add restaurant review
export const addRestaurantReview = async (userId, restaurantId, data) => {
    const reviewsCollectionRef = collection(db, "reviews");

    const newReview = {
        userId,
        restaurantId,
        ...data,
        reactions: {
            upVotes: [],
            downVotes: []
        }
    }

    const reviewDocRef = await addDoc(reviewsCollectionRef, {...newReview, timestamp: serverTimestamp()});
    console.log("Review document created with id:", reviewDocRef.id);

    return newReview;
};

// get all reviews by restaurant ID
export const getReviewsByRestaurantId = async (restaurantId) => {
    const reviewsCollectionRef = collection(db, "reviews");
    const q = query(reviewsCollectionRef, where("restaurantId", "==", restaurantId));

    const querySnapshot = await getDocs(q);

    const reviews = [];

    querySnapshot.forEach((doc) => {
        reviews.push({id: doc.id, ...doc.data()});
    });

    return reviews;
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

    const docRef = await doc(db,"restaurants", restaurant.id);

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
        restaurantData[interaction]++;
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
