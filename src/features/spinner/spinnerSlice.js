import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    visible: true,
};

export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers: {
        hideSpinner: state => {
            state.visible = false;
        },
        showSpinner: state => {
            state.visible = true;
        }
    }
})

// Action creators are generated for each case reducer function
export const {hideSpinner, showSpinner} = spinnerSlice.actions
export const selectSpinnerIsVisible = state => state.spinner.visible;
export default spinnerSlice.reducer