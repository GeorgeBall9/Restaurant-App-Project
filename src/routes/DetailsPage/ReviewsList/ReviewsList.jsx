import "./ReviewsList.css";
import StarRating from "../../../common/components/RestaurantCard/StarRating/StarRating";
import {faCircleUp as faSolidCircleUp, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faCircleUp} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {addUserReactionToReview, deleteRestaurantReview} from "../../../firebase/firebase";
import {useDispatch} from "react-redux";
import {deleteReview} from "../../../features/reviews/reviewsSlice";

const ReviewsList = ({reviews, userId, preview}) => {

    const dispatch = useDispatch();

    const handleUpVoteClick = async (reviewId) => {
        if (!reviews || !userId) return;

        await addUserReactionToReview(userId, reviewId, "upVotes");
    };

    const handleDownVoteClick = async (reviewId) => {
        if (!reviews || !userId) return;

        await addUserReactionToReview(userId, reviewId, "downVotes");
    };

    const [confirmDeleteReviewId, setConfirmDeleteReviewId] = useState(null);

    const handleEditClick = () => {
        console.log("editing review")
    };

    const handleDeleteClick = (id) => {
        setConfirmDeleteReviewId(id);
    };

    const handleYesClick = async () => {
        await deleteRestaurantReview(confirmDeleteReviewId);
        dispatch(deleteReview(confirmDeleteReviewId));
        setConfirmDeleteReviewId(null);
    };

    const handleNoClick = () => {
        setConfirmDeleteReviewId(null);
    };

    return (
        <div className="reviews-container">
            {!reviews?.length && (
                <p>No reviews available</p>
            )}

            {reviews && reviews
                .map(({id, userId: authorId, title, rating, content, visitDate, reactions}) => (
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

                        {!preview && (
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
                        )}
                    </div>
                ))}
        </div>
    );
};

export default ReviewsList;