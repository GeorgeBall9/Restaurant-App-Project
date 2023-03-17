import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeSlide: 0,
    lastSlide: 0
};

export const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        setLastSlide: (state, action) => {
            state.lastSlide = action.payload - 1;
            console.log("setting total slides to:", action.payload - 1);
        },
        changeSlide: (state, action) => {
            const direction = action.payload;

            if (direction === "forward") {
                if (state.activeSlide === state.lastSlide) {
                    state.activeSlide = 0;
                } else {
                    state.activeSlide = state.activeSlide + 1;
                }
            } else if (direction === "backward") {
                if (state.activeSlide !== 0) {
                    console.log("active slide:", state.activeSlide)
                    state.activeSlide = state.activeSlide - 1;
                }
            }
        }
    }
})

export const {setLastSlide, changeSlide} = sliderSlice.actions
export const selectActiveSlide = state => state.slider.activeSlide;
export default sliderSlice.reducer