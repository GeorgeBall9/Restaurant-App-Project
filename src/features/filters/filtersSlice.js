import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    filtersVisible: false,
    sortBy: null,
    cuisine: "Any",
    searchQuery: "",
    appliedSortByFilter: null,
    appliedCuisineFilter: null
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        resetSearchQuery: state => {
            state.searchQuery = null;
        },
        updateSortFilter: (state, action) => {
            state.sortBy = action.payload;
        },
        resetSortFilter: state => {
            state.sortBy = null;
        },
        updateCuisineFilter: (state, action) => {
            state.cuisine = action.payload;
        },
        resetCuisineFilter: state => {
            state.cuisine = "Any";
        },
        showFilters: state => {
            state.dropdownVisible = true;
        },
        hideFilters: state => {
            state.dropdownVisible = false;
        },
        applyFilters: state => {
            state.appliedSortByFilter = state.sortBy ? state.sortBy : null;
            state.appliedCuisineFilter = state.cuisine !== "Any" ? state.cuisine : null;
        },
        removedAppliedFilter: (state, action) => {
            const filter = action.payload;

            if (filter === "sortBy") {
                state.appliedSortByFilter = null;
                state.sortBy = null;
            } else if (filter === "cuisine") {
                state.appliedCuisineFilter = null;
                state.cuisine = "Any";
            }
        },
        resetFilters: state => {
            state.sortBy = null;
            state.appliedSortByFilter = null;
            state.cuisine = "Any";
            state.appliedCuisineFilter = null;
        }
    }
});

export const {
    updateSortFilter,
    resetSortFilter,
    updateCuisineFilter,
    resetCuisineFilter,
    showFilters,
    hideFilters,
    updateSearchQuery,
    applyFilters,
    removedAppliedFilter,
    resetFilters
} = filtersSlice.actions;
export const selectSortFilter = state => state.filters.sortBy;
export const selectCuisineFilter = state => state.filters.cuisine;
export const selectSearchQuery = state => state.filters.searchQuery;
export const selectFiltersAreVisible = state => state.filters.dropdownVisible;
export const selectAppliedSortFilter = state => state.filters.appliedSortByFilter;
export const selectAppliedCuisineFilter = state => state.filters.appliedCuisineFilter;
export default filtersSlice.reducer;