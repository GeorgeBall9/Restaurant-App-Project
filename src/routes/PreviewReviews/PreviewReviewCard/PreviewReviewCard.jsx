import "./PreviewReviewCard.css";
import ConfirmDeletePopup from "../ConfirmDeletePopup/ConfirmDeletePopup";
import RestaurantImage from "../../../common/components/RestaurantImage/RestaurantImage";
import StarRating from "../../../common/components/StarRating/StarRating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faUpRightAndDownLeftFromCenter} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {deleteRestaurantReview} from "../../../firebase/firebase";
import {deleteReview, selectReview} from "../../../features/reviews/reviewsSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";

const PreviewReviewCard = ({review}) => {

    const {id, rating, title, content, restaurantId, restaurantName, photoUrl} = review;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const [confirmDeleteReviewId, setConfirmDeleteReviewId] = useState(null);

    const handleDeleteClick = async () => {
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
                <ConfirmDeletePopup
                    handleConfirmDelete={handleDeleteClick}
                    handleCancelDelete={() => setConfirmDeleteReviewId(null)}
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
                <button onClick={() => handleExpandClick(id, restaurantId)}>
                    <FontAwesomeIcon className="icon" icon={faUpRightAndDownLeftFromCenter}/>
                </button>

                <button onClick={() => setConfirmDeleteReviewId(id)}>
                    <FontAwesomeIcon icon={faTrash} className="icon"/>
                </button>
            </div>
        </div>
    );
};

export default PreviewReviewCard;