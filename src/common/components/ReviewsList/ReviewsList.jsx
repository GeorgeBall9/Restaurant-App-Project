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

    const handleVoteClick = async (reviewId, voteType) => {
        if (!reviews || !userId) return;

        const reactions = await addUserReactionToReview(userId, reviewId, voteType);

        const updatedReview = {...reviews.find(review => review.id === reviewId)};
        updatedReview.reactions = reactions;
        dispatch(updateReview({reviewId, updatedReview}));
    };

    const handleDeleteReview = async (confirmDeleteReviewId) => {
        await deleteRestaurantReview(userId, confirmDeleteReviewId);
        dispatch(deleteReview(confirmDeleteReviewId));
    };

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
            handleVoteClick={handleVoteClick}
            handleYesClick={handleDeleteReview}
        />
    );
};

export default ReviewsList;