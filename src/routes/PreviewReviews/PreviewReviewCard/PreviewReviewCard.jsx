import "./PreviewReviewCard.css";
import ConfirmDeletePopup from "../ConfirmDeletePopup/ConfirmDeletePopup";
import RestaurantImage from "../../../common/components/RestaurantImage/RestaurantImage";
import StarRating from "../../../common/components/StarRating/StarRating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faUpRightAndDownLeftFromCenter} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const PreviewReviewCard = ({review, handleDelete, handleExpandClick}) => {

    const {id, rating, title, content, restaurantId, restaurantName, photoUrl} = review;

    const [confirmDeleteReviewId, setConfirmDeleteReviewId] = useState(null);

    const handleConfirmDelete = () => {
        handleDelete(confirmDeleteReviewId);
        setConfirmDeleteReviewId(null);
    };

    return (
        <div className="preview-review-card">
            {confirmDeleteReviewId === id && (
                <ConfirmDeletePopup
                    handleConfirmDelete={handleConfirmDelete}
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