import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dropdownVisible: false,
    sortBy: null,
    cuisine: "Any",
    searchQuery: ''
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateSortFilter: (state, action) => {
            state.sortBy = action.payload;
        },
        resetSortFilter: state => {
            state.sortBy = null;
        },
        updateSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        resetSearchQuery: state => {
            state.searchQuery = null;
        },
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

export const {
    updateSortFilter,
    resetSortFilter,
    updateCuisineFilter,
    resetCuisineFilter,
    toggleFiltersDropdown,
    updateSearchQuery,
    resetSearchQuery
} = filtersSlice.actions;
export const selectSortFilter = state => state.filters.sortBy;
export const selectCuisineFilter = state => state.filters.cuisine;
export const selectSearchQuery = state => state.filters.searchQuery;
export const selectDropdownFilterVisible = state => state.filters.dropdownVisible;
export default filtersSlice.reducer;