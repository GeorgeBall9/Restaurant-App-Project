import "./ReviewCard.css";
import UserIcon from "../../../UserIcon/UserIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp as faSolidCircleUp, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReportButton from "../../ReportButton/ReportButton";
import StarRating from "../../../StarRating/StarRating";
import { faCircleUp, faImages } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const ReviewCard = ({
    review,
    userId,
    handleVoteClick,
    confirmDeleteReviewId,
    handleConfirmDelete,
    handleNoClick,
    handleEditClick,
    handleDeleteClick,
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
        reactions,
        photoUrl
    } = review;

    const [showReviewPhotos, setShowReviewPhotos] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handlePhotoClick = (photoUrl) => {
        setSelectedPhoto(photoUrl);
    };

    const closeFullScreenPhoto = () => {
        setSelectedPhoto(null);
    };

    return (
        <div id={"review-" + id} className="review">
            {confirmDeleteReviewId === id && (
                <div className="confirm-delete-popup">
                    <p>Delete this review?</p>

                    <div className="buttons-container">
                        <button onClick={handleConfirmDelete}>Yes</button>
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
                            <FontAwesomeIcon icon={faPen} className="icon" />
                        </button>

                        <button onClick={() => handleDeleteClick(id)}>
                            <FontAwesomeIcon icon={faTrash} className="icon" />
                        </button>
                    </div>
                )}

                {authorId !== userId && (
                    <ReportButton reviewId={id} />
                )}
            </div>

            <div className="review-content">
                <div className="rating-and-date-container">
                    <StarRating rating={rating} />

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
                            <FontAwesomeIcon icon={faSolidCircleUp} className="icon" />
                        )}

                        {!reactions.upVotes.includes(userId) && (
                            <FontAwesomeIcon icon={faCircleUp} className="icon" />
                        )}
                    </button>

                    <p>{+(reactions.upVotes.length - reactions.downVotes.length)}</p>

                    <button onClick={() => handleVoteClick(id, "downVotes")}>
                        {reactions.downVotes.includes(userId) && (
                            <FontAwesomeIcon icon={faSolidCircleUp} className="icon" />
                        )}

                        {!reactions.downVotes.includes(userId) && (
                            <FontAwesomeIcon icon={faCircleUp} className="icon" />
                        )}
                    </button>

                    {photoUrl && (
                        <button className="show-photos-button" onClick={() => setShowReviewPhotos(!showReviewPhotos)}>
                            <FontAwesomeIcon icon={faImages} className="icon" />
                        </button>
                    )}
                </div>
                {showReviewPhotos && (
                    <div className={`review-photos${showReviewPhotos ? " visible" : ""}`}>
                        <div onClick={() => handlePhotoClick(photoUrl)}>
                            <img className="user-review-photo" src={photoUrl} alt= "Review Photo" loading="lazy" />
                        </div>
                    </div>
                )}

                {selectedPhoto && (
                    <div className="full-screen-photo" onClick={closeFullScreenPhoto}>
                        <img src={selectedPhoto} alt="Full screen review photo" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewCard;