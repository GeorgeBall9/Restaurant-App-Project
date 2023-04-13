import "./ReviewsList.css";
import StarRating from "../../../common/components/RestaurantCard/StarRating/StarRating";
import {faCircleUp as faSolidCircleUp, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faCircleUp} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {addUserReactionToReview, deleteRestaurantReview} from "../../../firebase/firebase";
import {useDispatch} from "react-redux";
import {deleteReview, updateReview} from "../../../features/reviews/reviewsSlice";
import ReviewForm from "../ReviewForm/ReviewForm";

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
        console.log("editing review");
        setEditingReviewId(id);
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

            {reviews && [...reviews]
                .sort((a, b) => b.visitDate - a.visitDate)
                .map(({id, userId: authorId, title, rating, content, visitDate, reactions}) => {
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
                        />
                    }

                    return (
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
                                    {new Date(visitDate).toLocaleDateString()}
                                </p>
                            </div>

                            <p>{content}</p>

                            {!preview && (
                                <div className="buttons-container">
                                    <button onClick={() => handleVoteClick(id, "upVotes")}>
                                        {reactions.upVotes.includes(userId) && (
                                            <FontAwesomeIcon icon={faSolidCircleUp} className="icon"/>
                                        )}

                                        {!reactions.upVotes.includes(userId) && (
                                            <FontAwesomeIcon icon={faCircleUp} className="icon"/>
                                        )}
                                    </button>

                                    <p>{+(reactions.upVotes.length - reactions.downVotes.length)}</p>

                                    <button onClick={() => handleVoteClick(id, "downVotes")}>
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
                    )
                })}
        </div>
    );
};

export default ReviewsList;