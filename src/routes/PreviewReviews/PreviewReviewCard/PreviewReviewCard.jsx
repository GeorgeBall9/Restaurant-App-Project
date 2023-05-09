import "./PreviewReviewCard.css";
import RestaurantImage from "../../../common/components/RestaurantImage/RestaurantImage";
import StarRating from "../../../common/components/StarRating/StarRating";
import {faTrash, faUpRightAndDownLeftFromCenter} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {deleteRestaurantReview} from "../../../firebase/firebase";
import {deleteReview, selectReview} from "../../../features/reviews/reviewsSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";
import InteractionButton from "../../../common/components/ButtonViews/InteractionButton/InteractionButton";
import ConfirmationPopupView from "../../../common/components/ConfirmationPopupView/ConfirmationPopupView";

const PreviewReviewCard = ({review, canDelete}) => {

    const {id, rating, title, content, restaurantId, restaurantName, photoUrl} = review;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const [confirmDeleteReviewId, setConfirmDeleteReviewId] = useState(null);

    const handleDelete = async () => {
        await deleteRestaurantReview(userId, id);
        dispatch(deleteReview(id));
        setConfirmDeleteReviewId(null);
    };

    const handleExpandClick = (reviewId, restaurantId) => {
        dispatch(selectReview(reviewId));
        navigate("/details/" + restaurantId);
    };

    return (
        <div className="preview-review-card">
            {confirmDeleteReviewId === id && (
                <ConfirmationPopupView
                    message="Delete this review?"
                    handleYesClick={handleDelete}
                    handleNoClick={() => setConfirmDeleteReviewId(null)}
                />
            )}

            <div className="container-lhs">
                <RestaurantImage photoUrl={photoUrl} name={restaurantName}/>

                <div className="preview">
                    <h3 style={{margin: 0}}>{title}</h3>

                    <StarRating rating={rating}/>

                    <p>{content}</p>
                </div>
            </div>

            <div className="container-rhs">
                <InteractionButton
                    icon={faUpRightAndDownLeftFromCenter}
                    handleClick={() => handleExpandClick(id, restaurantId)}
                />

                {canDelete && (
                    <InteractionButton
                        icon={faTrash}
                        handleClick={() => setConfirmDeleteReviewId(id)}
                    />
                )}

                {!canDelete && (
                    <InteractionButton
                        icon={faUpRightAndDownLeftFromCenter}
                        handleClick={() => handleExpandClick(id, restaurantId)}
                        style={{visibility: "hidden"}}
                    />
                )}
            </div>
        </div>
    );
};

export default PreviewReviewCard;