import {useEffect} from "react";
import {addUserReactionToReview, deleteRestaurantReview} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteReview,
    deselectReview,
    selectSelectedReviewId,
    updateReview
} from "../../../features/reviews/reviewsSlice";
import ReviewsListView from "./ReviewsListView/ReviewsListView";

const ReviewsList = ({reviews, userId, preview}) => {

    const dispatch = useDispatch();

    const selectedReviewId = useSelector(selectSelectedReviewId);

    useEffect(() => {
        if (!reviews || !selectedReviewId) return;

        const review = document.getElementById("review-" + selectedReviewId);

        if (!review) {
            dispatch(deselectReview());
        } else {
            review.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [selectedReviewId, reviews]);

    return (
        <ReviewsListView
            reviews={reviews}
            userId={userId}
            preview={preview}
        />
    );
};

export default ReviewsList;