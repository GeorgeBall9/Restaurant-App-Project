import "./ReviewsList.css";
import StarRating from "../StarRating/StarRating";
import {faCircleUp as faSolidCircleUp, faFlag, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faCircleUp} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {addUserReactionToReview, deleteRestaurantReview} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteReview,
    deselectReview,
    selectSelectedReviewId,
    updateReview
} from "../../../features/reviews/reviewsSlice";
import ReviewForm from "../ReviewForm/ReviewForm";
import UserIcon from "../UserIcon/UserIcon";
import ReportButton from "./ReportButton/ReportButton";

const ReviewsList = ({reviews, userId, preview}) => {

    const dispatch = useDispatch();

    const handleVoteClick = async (reviewId, voteType) => {
        if (!reviews || !userId) return;

        const reactions = await addUserReactionToReview(userId, reviewId, voteType);

        const updatedReview = {...reviews.find(review => review.id === reviewId)};
        updatedReview.reactions = reactions;
        dispatch(updateReview({reviewId, updatedReview}));
    };

    const [confirmDeleteReviewId, setConfirmDeleteReviewId] = useState(null);

    const [editingReviewId, setEditingReviewId] = useState(null);

    const handleEditClick = (id) => {
        setEditingReviewId(id);
    };

    const handleDeleteClick = (id) => {
        setConfirmDeleteReviewId(id);
    };

    const handleYesClick = async () => {
        await deleteRestaurantReview(userId, confirmDeleteReviewId);
        dispatch(deleteReview(confirmDeleteReviewId));
        setConfirmDeleteReviewId(null);
    };

    const handleNoClick = () => {
        setConfirmDeleteReviewId(null);
    };

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
        <div className="reviews-container">
            {!reviews?.length && (
                <p>No reviews available</p>
            )}

            {reviews && [...reviews]
                .slice(0, (preview ? 3 : reviews.length))
                .map(review => {
                    let {
                        id,
                        userId: authorId,
                        iconColour,
                        profilePhotoUrl,
                        displayName,
                        title,
                        rating,
                        content,
                        visitDate,
                        reactions,
                        numberOfReviews
                    } = review;

                    if (editingReviewId === id) {
                        visitDate = new Date(visitDate)
                            .toISOString()
                            .replaceAll("/", "-")
                            .split("T")
                            .at(0);

                        return <ReviewForm
                            key={id}
                            userId={authorId}
                            edit={true}
                            reviewId={id}
                            reviewData={{rating, visitDate, title, content}}
                            handleCancel={() => setEditingReviewId(null)}
                        />
                    }

                    return (
                        <></>
                    )
                })}
        </div>
    );
};

export default ReviewsList;