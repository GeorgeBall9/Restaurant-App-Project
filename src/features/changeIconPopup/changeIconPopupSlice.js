import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    visible: false,
};

export const changeIconPopupSlice = createSlice({
    name: 'changeIconPopup',
    initialState,
    reducers: {
        showChangeIconPopup: state => {
            state.visible = true;
        },
        hideChangeIconPopup: state => {
            state.visible = false;
        }
    }
})

// Action creators are generated for each case reducer function
export const {showChangeIconPopup, hideChangeIconPopup} = changeIconPopupSlice.actions
export const selectChangeIconPopupIsVisible = state => state.changeIconPopup.visible;
export default changeIconPopupSlice.reducer