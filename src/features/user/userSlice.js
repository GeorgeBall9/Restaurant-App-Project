import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: JSON.parse(localStorage.getItem("userId")),
    displayName: null,
    iconColour: null,
    bookmarks: []
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.id = action.payload;
        },
        setUserDetails: (state, action) => {
            const {id, displayName, iconColour, bookmarks} = action.payload;
            state.id = id;
            state.displayName = displayName;
            state.iconColour = iconColour;
            state.bookmarks = bookmarks;
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
        setBookmarks: (state, action) => {
            state.bookmarks = action.payload;
        }
    },
});

export const {
    setUserId,
    setUserDetails,
    resetUserDetails,
    setDisplayName,
    setIconColour,
    setBookmarks
} = userSlice.actions;
export const selectUserId = state => state.user.id;
export const selectDisplayName = state => state.user.displayName;
export const selectIconColour = state => state.user.iconColour;
export const selectBookmarks = state => state.user.bookmarks;
export default userSlice.reducer;