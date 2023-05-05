import "./ReviewCard.css";
import UserIcon from "../../UserIcon/UserIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import ReportButton from "../ReportButton/ReportButton";
import StarRating from "../../StarRating/StarRating";
import {faImages} from "@fortawesome/free-regular-svg-icons";
import {useState} from "react";
import {addUserReactionToReview, deleteRestaurantReview} from "../../../../firebase/firebase";
import {deleteReview, selectReviews, updateReview} from "../../../../features/reviews/reviewsSlice";
import {useDispatch, useSelector} from "react-redux";
import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import InversePrimaryButton from "../../InversePrimaryButton/InversePrimaryButton";
import VoteButton from "./VoteButton/VoteButton";
import InteractionButton from "../../InteractionButton/InteractionButton";

const ReviewCard = ({review, userId, handleEditClick}) => {

    const {
        id,
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

    const dispatch = useDispatch();

    const reviews = useSelector(selectReviews);

    const [showReviewPhotos, setShowReviewPhotos] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState("");
    const [confirmationPopupIsVisible, setConfirmationPopupIsVisible] = useState(false);

    const handlePhotoClick = (photoUrl) => {
        setSelectedPhoto(photoUrl);
    };

    const closeFullScreenPhoto = () => {
        setSelectedPhoto("");
    };

    const handleVoteClick = async (reviewId, voteType) => {
        if (!reviews || !userId) return;

        const reactions = await addUserReactionToReview(userId, reviewId, voteType);

        const updatedReview = {...reviews.find(review => review.id === reviewId)};
        updatedReview.reactions = reactions;
        dispatch(updateReview({reviewId, updatedReview}));
    };

    const handleYesClick = async () => {
        await deleteRestaurantReview(userId, id);
        dispatch(deleteReview(id));
        setConfirmationPopupIsVisible(false);
    };

    return (
        <div id={"review-" + id} className="review">
            {confirmationPopupIsVisible && (
                <div className="confirm-delete-popup">
                    <p>Delete this review?</p>

                    <div className="buttons-container">
                        <PrimaryButton text="Yes" handleClick={handleYesClick}/>

                        <InversePrimaryButton
                            text="No"
                            handleClick={() => setConfirmationPopupIsVisible(false)}
                        />
                    </div>
                </div>
            )}

            <div className="review-header">
                <div className="author-details">
                    <UserIcon
                        size="medium"
                        imageUrl={profilePhotoUrl}
                    />

                    <div>
                        <p className="display-name">{displayName}</p>
                        {numberOfReviews && (
                            <p>{numberOfReviews} review{numberOfReviews > 1 ? "s" : ""}</p>
                        )}
                    </div>
                </div>

                {authorId === userId && (
                    <div className="buttons-container">
                        <InteractionButton icon={faPen} handleClick={() => handleEditClick(id)}/>

                        <InteractionButton
                            icon={faTrash}
                            handleClick={() => setConfirmationPopupIsVisible(true)}
                        />
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
                    <VoteButton
                        isSolid={reactions.upVotes.includes(userId)}
                        handleClick={() => handleVoteClick(id, "upVotes")}
                    />

                    <p>{+(reactions.upVotes.length - reactions.downVotes.length)}</p>

                    <VoteButton
                        isSolid={reactions.downVotes.includes(userId)}
                        handleClick={() => handleVoteClick(id, "downVotes")}
                    />

                    {photoUrl && (
                        <button className="show-photos-button" onClick={() => setShowReviewPhotos(!showReviewPhotos)}>
                            <FontAwesomeIcon icon={faImages} className="icon"/>
                        </button>
                    )}
                </div>

                {showReviewPhotos && (
                    <div className={`review-photos${showReviewPhotos ? " visible" : ""}`}>
                        <div onClick={() => handlePhotoClick(photoUrl)}>
                            <img className="user-review-photo" src={photoUrl} alt="Review Photo" loading="lazy"/>
                        </div>
                    </div>
                )}

                {selectedPhoto && (
                    <div className="full-screen-photo" onClick={closeFullScreenPhoto}>
                        <img src={selectedPhoto} alt="Full screen review photo"/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewCard;