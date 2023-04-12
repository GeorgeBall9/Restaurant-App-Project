import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: JSON.parse(localStorage.getItem("userId")),
    displayName: "",
    email: "",
    phone: "",
    iconColour: "",
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
            const {id, displayName, email, phone, iconColour, bookmarks, checkedIn} = action.payload;

            state.id = id;
            state.displayName = displayName || "";
            state.email = email || "";
            state.phone = phone || "";
            state.iconColour = iconColour || "";
            state.bookmarks = bookmarks || [];
            state.checkedInRestaurants = checkedIn || [];
        },
        resetUserDetails: state => {
            state.id = null;
            state.displayName = "";
            state.email = "";
            state.phone = "";
            state.iconColour = null;
            state.bookmarks = [];
            state.checkedInRestaurants = [];
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
    addBookmark,
    removeBookmark,
    addCheckedInRestaurant,
    removeCheckedInRestaurant,
    setCheckedInRestaurants
} = userSlice.actions;
export const selectUserId = state => state.user.id;
export const selectDisplayName = state => state.user.displayName;
export const selectEmail = state => state.user.email;
export const selectPhone = state => state.user.phone;
export const selectIconColour = state => state.user.iconColour;
export const selectBookmarks = state => state.user.bookmarks;
export const selectCheckedInRestaurants = state => state.user.checkedInRestaurants;
export default userSlice.reducer;