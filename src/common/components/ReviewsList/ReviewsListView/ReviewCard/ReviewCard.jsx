import "./ReviewCard.css";
import UserIcon from "../../../UserIcon/UserIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUp as faSolidCircleUp, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import ReportButton from "../../ReportButton/ReportButton";
import StarRating from "../../../StarRating/StarRating";
import {faCircleUp} from "@fortawesome/free-regular-svg-icons";

const ReviewCard = ({
                        review,
                        userId,
                        handleVoteClick,
                        confirmDeleteReviewId,
                        handleYesClick,
                        handleNoClick,
                        handleEditClick,
                        handleDeleteClick
                    }) => {

    const {
        id,
        iconColour,
        profilePhotoUrl,
        displayName,
        numberOfReviews,
        authorId,
        rating,
        visitDate,
        title,
        content,
        reactions
    } = review;

    return (
        <div key={id} id={"review-" + id} className="review">
            {confirmDeleteReviewId === id && (
                <div className="confirm-delete-popup">
                    <p>Delete this review?</p>

                    <div className="buttons-container">
                        <button onClick={handleYesClick}>Yes</button>
                        <button onClick={handleNoClick}>No</button>
                    </div>
                </div>
            )}

            <div className="review-header">
                <div className="author-details">
                    <div className="user-icon-container">
                        <UserIcon
                            size="medium"
                            colour={iconColour}
                            skeleton={!iconColour && !profilePhotoUrl}
                            imageUrl={profilePhotoUrl}
                        />
                    </div>

                    <div>
                        <p className="display-name">{displayName}</p>
                        {numberOfReviews && (
                            <p>{numberOfReviews} review{numberOfReviews > 1 ? "s" : ""}</p>
                        )}
                    </div>
                </div>

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

                {authorId !== userId && (
                    <ReportButton reviewId={id}/>
                )}
            </div>

            <div className="review-content">
                <div className="rating-and-date-container">
                    <StarRating rating={rating}/>

                    <p>
                        <strong>Visit date: </strong>
                        {new Date(visitDate).toLocaleDateString()}
                    </p>
                </div>

                <h3>{title}</h3>

                <p>{content}</p>

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
            </div>
        </div>
    );
};

export default ReviewCard;