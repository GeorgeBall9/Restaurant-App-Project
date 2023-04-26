import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    visible: false,
    checkedIn: false,
    feedbackIsVisible: false,
    addedCheckIn: false,
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
        showCheckInFeedback: (state, action) => {
            state.feedbackIsVisible = true;
            state.addedCheckIn = action.payload === "add";
        },
        resetCheckInFeedback: state => {
            state.feedbackIsVisible = false;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    showCheckInConfirmation,
    hideCheckInConfirmation,
    setCheckedInStatus,
    showCheckInFeedback,
    resetCheckInFeedback
} = checkInConfirmationSlice.actions;
export const selectCheckInConfirmationIsVisible = state => state.checkInConfirmation.visible;
export const selectCheckedIn = state => state.checkInConfirmation.checkedIn;
export const selectCheckInFeedbackIsVisible = state => state.checkInConfirmation.feedbackIsVisible;
export const selectAddedCheckIn = state => state.checkInConfirmation.addedCheckIn;
export default checkInConfirmationSlice.reducer;