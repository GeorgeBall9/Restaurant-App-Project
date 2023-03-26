import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeSlide: 0,
    lastSlide: 0,
    isActive: true,
};

export const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        setActiveSlide: (state, action) => {
            state.activeSlide = action.payload;
        },
        setLastSlide: (state, action) => {
            state.lastSlide = action.payload - 1;
        },
        changeSlide: (state, action) => {
            const direction = action.payload;

            if (direction === "forward") {
                if (state.activeSlide !== state.lastSlide) {
                    state.activeSlide = state.activeSlide + 1;
                }
            } else if (direction === "backward") {
                if (state.activeSlide !== 0) {
                    state.activeSlide = state.activeSlide - 1;
                }
            }
        },
        activateSlider: state => {
            state.isActive = true;
        },
        deactivateSlider: state => {
            state.isActive = false;
        }
    }
})

export const {setActiveSlide, setLastSlide, changeSlide, activateSlider, deactivateSlider} = sliderSlice.actions
export const selectActiveSlide = state => state.slider.activeSlide;
export const selectLastSlide = state => state.slider.lastSlide;
export const selectSliderIsActive = state => state.slider.isActive;
export default sliderSlice.reducer