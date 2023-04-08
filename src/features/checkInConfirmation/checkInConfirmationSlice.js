import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    visible: false,
    checkedIn: false,
};

export const checkInConfirmationSlice = createSlice({
    name: 'checkInConfirmation',
    initialState,
    reducers: {
        showCheckInConfirmation: state => {
            state.visible = true;
        },
        hideCheckInConfirmation: state => {
            state.visible = false;
        },
        setCheckedInStatus: (state, action) => {
            state.checkedIn = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const {showCheckInConfirmation, hideCheckInConfirmation, setCheckedInStatus} = checkInConfirmationSlice.actions;
export const selectCheckInConfirmationIsVisible = state => state.checkInConfirmation.visible;
export const selectCheckedIn = state => state.checkInConfirmation.checkedIn;
export default checkInConfirmationSlice.reducer;