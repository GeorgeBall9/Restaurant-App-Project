import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cuisine: "Any",
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateCuisineFilter: (state, action) => {
            state.cuisine = action.payload;
        },
        resetCuisineFilter: state => {
            state.cuisine = "Any";
        }
    }
});

export const {updateCuisineFilter, resetCuisineFilter} = filtersSlice.actions;
export const selectCuisineFilter = state => state.filters.cuisine;
export default filtersSlice.reducer;