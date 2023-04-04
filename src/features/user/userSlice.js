import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: null,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload.userId;
        },
        resetUserId: state => {
            state.id = null;
        },
        setDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
        setIconColour: (state, action) => {
            state.iconColour = action.payload;
        }
    },
});

export const {setUserId, resetUserId, setDisplayName, setIconColour} = userSlice.actions;
export const selectUserId = state => state.user.id;
export const selectDisplayName = state => state.user.displayName;
export const selectIconColour = state => state.user.iconColour;
export default userSlice.reducer;