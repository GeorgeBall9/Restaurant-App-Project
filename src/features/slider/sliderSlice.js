import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeSlide: 1,
    totalSlides: 0
};

export const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        setTotalSlides: (state, action) => {
            state.totalSlides = action.payload;
        },
        changeSlide: (state, action) => {
            const direction = action.payload;

            if (direction === "forward") {
                if (state.activeSlide === state.totalSlides) {
                    state.activeSlide = 0;
                } else {
                    state.activeSlide++;
                }
            } else {
                if (state.activeSlide === 1) {
                    state.activeSlide = state.totalSlides;
                } else {
                    state.activeSlide--;
                }
            }
        },
    }
})

export const {setTotalSlides, changeSlide} = sliderSlice.actions

export default sliderSlice.reducer