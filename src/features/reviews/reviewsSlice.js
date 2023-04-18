import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    reviews: [],
    selectedReviewId: null,
    sortFilter: "Most recent"
};

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
        addReview: (state, action) => {
            state.reviews.push(action.payload);
        },
        deleteReview: (state, action) => {
            state.reviews = state.reviews.filter(review => review.id !== action.payload);
        },
        updateReview: (state, action) => {
            const {reviewId, updatedReview} = action.payload;
            state.reviews = state.reviews.map(review => {
                if (review.id === reviewId) {
                    return updatedReview;
                } else {
                    return review;
                }
            });
        },
        selectReview: (state, action) => {
            state.selectedReviewId = action.payload;
        },
        deselectReview: state => {
            state.selectedReviewId = null;
        },
        sortReviews: (state, action) => {
            const {text, filter, multiplier} = action.payload;
            state.reviews = [...state.reviews].sort((a, b) => multiplier * (a[filter] - b[filter]));
            state.sortFilter = text;
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setReviews,
    addReview,
    deleteReview,
    updateReview,
    selectReview,
    deselectReview,
    sortReviews
} = reviewsSlice.actions
export const selectReviews = state => state.reviews.reviews;
export const selectSelectedReviewId = state => state.reviews.selectedReviewId;
export const selectSortFilter = state => state.reviews.sortFilter;
export default reviewsSlice.reducer