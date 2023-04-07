import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: JSON.parse(localStorage.getItem("userId")),
    displayName: null,
    iconColour: null,
    bookmarks: [],
    checkedInRestaurants: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.id = action.payload;
        },
        setUserDetails: (state, action) => {
            const {id, displayName, iconColour, bookmarks, checkedIn} = action.payload;

            state.id = id;
            state.displayName = displayName ? displayName : null;
            state.iconColour = iconColour ? iconColour : null;
            state.bookmarks = bookmarks ? bookmarks : [];
            state.checkedInRestaurants = checkedIn ? checkedIn : [];
        },
        resetUserDetails: state => {
            state.id = null;
            state.displayName = null;
            state.iconColour = null;
        },
        setDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
        setIconColour: (state, action) => {
            state.iconColour = action.payload;
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
        }
    },
});

export const {
    setUserId,
    setUserDetails,
    resetUserDetails,
    setDisplayName,
    setIconColour,
    addBookmark,
    removeBookmark,
    addCheckedInRestaurant,
    removeCheckedInRestaurant
} = userSlice.actions;
export const selectUserId = state => state.user.id;
export const selectDisplayName = state => state.user.displayName;
export const selectIconColour = state => state.user.iconColour;
export const selectBookmarks = state => state.user.bookmarks;
export const selectCheckedInRestaurants = state => state.user.checkedInRestaurants;
export default userSlice.reducer;