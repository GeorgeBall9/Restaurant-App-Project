import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: JSON.parse(localStorage.getItem("userId")),
    displayName: "",
    email: "",
    phone: "",
    iconColour: "",
    profilePhotoUrl: "",
    recommendations: [],
    bookmarks: [],
    checkedInRestaurants: [],
    friends: [],
    friendRequests: [],
    friendsSortFilter: "Most recent",
    allPhotoUrls: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.id = action.payload;
        },
        setUserDetails: (state, action) => {
            const {
                id,
                displayName,
                email,
                phone,
                iconColour,
                profilePhotoUrl,
                recommendations,
                bookmarks,
                checkedIn,
                allPhotoUrls
            } = action.payload;

            state.id = id;
            state.displayName = displayName || "";
            state.email = email || "";
            state.phone = phone || "";
            state.iconColour = iconColour || "";
            state.profilePhotoUrl = profilePhotoUrl || null;
            state.recommendations = recommendations || [];
            state.bookmarks = bookmarks || [];
            state.checkedInRestaurants = checkedIn || [];
            state.allPhotoUrls = allPhotoUrls || [];
        },
        resetUserDetails: state => {
            state.id = null;
            state.displayName = "";
            state.email = "";
            state.phone = "";
            state.iconColour = null;
            state.profilePhotoUrl = "";
            state.recommendations = [];
            state.bookmarks = [];
            state.checkedInRestaurants = [];
            state.allPhotoUrls = [];
        },
        setDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setIconColour: (state, action) => {
            state.iconColour = action.payload;
        },
        setProfilePhotoUrl: (state, action) => {
            state.profilePhotoUrl = action.payload;
        },
        addRecommendation: (state, action) => {
            state.recommendations.push(action.payload);
        },
        removeRecommendation: (state, action) => {
            state.recommendations = state.recommendations.filter(recommendation => recommendation !== action.payload);
        },
        addBookmark: (state, action) => {
            state.bookmarks.push(action.payload);
        },
        removeBookmark: (state, action) => {
            state.bookmarks = state.bookmarks.filter(bookmark => bookmark !== action.payload);
        },
        addCheckedInRestaurant: (state, action) => {
            state.checkedInRestaurants.push(action.payload);
        },
        removeCheckedInRestaurant: (state, action) => {
            state.checkedInRestaurants = state.checkedInRestaurants
                .filter(restaurant => restaurant !== action.payload);
        },
        setCheckedInRestaurants: (state, action) => {
            state.checkedInRestaurants = action.payload.length ? action.payload : [];
        },
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        removeFriend: (state, action) => {
            state.friends = state.friends.filter(friend => friend.id !== action.payload)
        },
        setFriendRequests: (state, action) => {
            state.friendRequests = action.payload;
        },
        removeFriendRequest: (state, action) => {
            state.friendRequests = state.friendRequests.filter(request => request.id !== action.payload)
        },
        sortFriends: (state, action) => {
            const {text, filter, multiplier} = action.payload;
            state.friends = [...state.friends].sort((a, b) => multiplier * (a[filter] - b[filter]));
            state.friendsSortFilter = text;
        },
        sortFriendRequests: (state, action) => {
            const {text, filter, multiplier} = action.payload;
            state.friendRequests = [...state.friendRequests]
                .sort((a, b) => multiplier * (a[filter] - b[filter]));
            state.friendsSortFilter = text;
        },
        setAllPhotoUrls: (state, action) => {
            state.allPhotoUrls = action.payload;
        }
    },
});

export const {
    setUserId,
    setUserDetails,
    resetUserDetails,
    setDisplayName,
    setEmail,
    setPhone,
    setIconColour,
    addRecommendation,
    removeRecommendation,
    addBookmark,
    removeBookmark,
    addCheckedInRestaurant,
    removeCheckedInRestaurant,
    setCheckedInRestaurants,
    setFriends,
    removeFriend,
    setFriendRequests,
    removeFriendRequest,
    sortFriends,
    sortFriendRequests,
    setProfilePhotoUrl,
    setAllPhotoUrls
} = userSlice.actions;
export const selectUserId = state => state.user.id;
export const selectDisplayName = state => state.user.displayName;
export const selectEmail = state => state.user.email;
export const selectPhone = state => state.user.phone;
export const selectIconColour = state => state.user.iconColour;
export const selectRecommendations = state => state.user.recommendations;
export const selectBookmarks = state => state.user.bookmarks;
export const selectCheckedInRestaurants = state => state.user.checkedInRestaurants;
export const selectFriends = state => state.user.friends;
export const selectFriendRequests = state => state.user.friendRequests;
export const selectFriendsSortFilter = state => state.user.friendsSortFilter;
export const selectProfilePhotoUrl = state => state.user.profilePhotoUrl;
export const selectAllPhotoUrls = state => state.user.allPhotoUrls;
export default userSlice.reducer;