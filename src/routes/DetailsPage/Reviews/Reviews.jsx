import "./Reviews.css";
import StarRating from "../../../common/components/RestaurantCard/StarRating/StarRating";
import {faCircleUp as faSolidCircleUp, faPen, faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faCircleUp} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {addUserReactionToReview, deleteRestaurantReview, getReviewsByRestaurantId} from "../../../firebase/firebase";
import {useDispatch} from "react-redux";
import {showOverlay} from "../../../features/overlay/overlaySlice";

const Reviews = ({userId, restaurantId}) => {

    const dispatch = useDispatch();

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        if (!restaurantId) return;

        getReviewsByRestaurantId(restaurantId)
            .then(reviewsFound => setReviews(reviewsFound));
    }, [restaurantId]);

    const handleUpVoteClick = async (reviewId) => {
        const reactions = await addUserReactionToReview(userId, reviewId, "upVotes");

        setReviews(reviews => {
            const foundReview = reviews.find(review => review.id === reviewId);
            const updatedReviews = reviews.filter(review => review.id !== reviewId);
            foundReview.reactions = reactions;
            updatedReviews.push(foundReview);
            return updatedReviews;
        });
    };

    const handleDownVoteClick = async (reviewId) => {
        const reactions = await addUserReactionToReview(userId, reviewId, "downVotes");

        setReviews(reviews => {
            const foundReview = reviews.find(review => review.id === reviewId);
            const updatedReviews = reviews.filter(review => review.id !== reviewId);
            foundReview.reactions = reactions;
            updatedReviews.push(foundReview);
            return updatedReviews;
        });
    };

    const [confirmDeleteReviewId, setConfirmDeleteReviewId] = useState(null);

    const handleEditClick = () => {
        console.log("editing review")
    };

    const handleDeleteClick = (id) => {
        console.log("deleting review");
        setConfirmDeleteReviewId(id);
        // dispatch(showOverlay());
    };

    const handleYesClick = async () => {
        console.log("confirm delete");
        await deleteRestaurantReview(confirmDeleteReviewId);
        setReviews(reviews => reviews.filter(review => review.id !== confirmDeleteReviewId));
        setConfirmDeleteReviewId(null);
    };

    const handleNoClick = () => {
        console.log("cancel delete");
        setConfirmDeleteReviewId(null);
    };

    return (
        <div className="reviews-container">
            {!reviews?.length && (
                <p>No reviews available</p>
            )}

            {reviews && reviews.map(({id, userId: authorId, title, rating, content, visitDate, reactions}) => (
                <div key={id} className="review">
                    {confirmDeleteReviewId === id && (
                        <div className="confirm-delete-popup">
                            <p>Delete this review?</p>

                            <div className="buttons-container">
                                <button onClick={handleYesClick}>Yes</button>
                                <button onClick={handleNoClick}>No</button>
                            </div>
                        </div>
                    )}

                    <header>
                        <h3>{title}</h3>

                        {authorId === userId && (
                            <div className="buttons-container">
                                <button onClick={() => handleEditClick(id)}>
                                    <FontAwesomeIcon icon={faPen} className="icon"/>
                                </button>

                                <button onClick={() => handleDeleteClick(id)}>
                                    <FontAwesomeIcon icon={faTrash} className="icon"/>
                                </button>
                            </div>
                        )}
                    </header>

                    <div className="rating-and-date-container">
                        <StarRating rating={rating}/>

                        <p>
                            <strong>Visit date: </strong>
                            {visitDate}
                        </p>
                    </div>

                    <p>{content}</p>

                    <div className="buttons-container">
                        <button onClick={() => handleUpVoteClick(id)}>
                            {reactions.upVotes.includes(userId) && (
                                <FontAwesomeIcon icon={faSolidCircleUp} className="icon"/>
                            )}

                            {!reactions.upVotes.includes(userId) && (
                                <FontAwesomeIcon icon={faCircleUp} className="icon"/>
                            )}
                        </button>

                        <p>{+(reactions.upVotes.length - reactions.downVotes.length)}</p>

                        <button onClick={() => handleDownVoteClick(id)}>
                            {reactions.downVotes.includes(userId) && (
                                <FontAwesomeIcon icon={faSolidCircleUp} className="icon"/>
                            )}

                            {!reactions.downVotes.includes(userId) && (
                                <FontAwesomeIcon icon={faCircleUp} className="icon"/>
                            )}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;