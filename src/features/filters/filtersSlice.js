import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dropdownVisible: false,
    sortBy: "Distance",
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
        },
        toggleFiltersDropdown: state => {
            state.dropdownVisible = !state.dropdownVisible;
        },
    }
});

export const {updateCuisineFilter, resetCuisineFilter, toggleFiltersDropdown} = filtersSlice.actions;
export const selectCuisineFilter = state => state.filters.cuisine;
export const selectDropdownFilterVisible = state => state.filters.dropdownVisible;
export default filtersSlice.reducer;