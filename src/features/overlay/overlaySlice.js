import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    visible: false
};

export const overlaySlice = createSlice({
    name: 'overlay',
    initialState,
    reducers: {
        showOverlay: state => {
            state.visible = true;
        },
        hideOverlay: state => {
            state.visible = false;
        }
    }
});

export const {showOverlay, hideOverlay} = overlaySlice.actions;
export const selectOverlayIsVisible = state => state.overlay.visible;
export default overlaySlice.reducer;