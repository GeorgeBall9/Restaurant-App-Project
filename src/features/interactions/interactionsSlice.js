import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    recommendations: 0,
    bookmarks: 0,
    checkIns: 0,
};

export const interactionsSlice = createSlice({
    name: 'interactions',
    initialState,
    reducers: {
        addRecommendationInteraction: state => {
            state.recommendations = state.recommendations + 1;
        },
        addBookmarkInteraction: state => {
            state.bookmarks = state.bookmarks + 1;
        },
        addCheckInInteraction: state => {
            state.checkIns = state.checkIns + 1;
        },
        removeRecommendationInteraction: state => {
            state.recommendations = state.recommendations - 1;
        },
        removeBookmarkInteraction: state => {
            state.bookmarks = state.bookmarks - 1;
        },
        removeCheckInInteraction: state => {
            state.checkIns = state.checkIns - 1;
        },
        setInteractions: (state, action) => {
            const {recommendations, bookmarks, checkIns} = action.payload;
            state.recommendations = recommendations;
            state.bookmarks = bookmarks;
            state.checkIns = checkIns;
        },
        resetInteractions: state => {
            state.recommendations = 0;
            state.bookmarks = 0;
            state.checkIns = 0;
        }
    }
});

export const {
    addRecommendationInteraction,
    addBookmarkInteraction,
    addCheckInInteraction,
    removeRecommendationInteraction,
    removeBookmarkInteraction,
    removeCheckInInteraction,
    setInteractions,
    resetInteractions
} = interactionsSlice.actions;

export const selectRecommendationInteractions = state => state.interactions.recommendations;
export const selectBookmarkInteractions = state => state.interactions.bookmarks;
export const selectCheckInInteractions = state => state.interactions.checkIns;

export default interactionsSlice.reducer;