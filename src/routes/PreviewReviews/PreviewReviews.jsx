import "./PreviewReviews.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import { deleteRestaurantReview, getReviewsByUserId } from "../../firebase/firebase";
import { deleteReview, selectReview, selectReviews, setReviews } from "../../features/reviews/reviewsSlice";
import RestaurantImage from "../../common/components/RestaurantImage/RestaurantImage";
import StarRating from "../../common/components/StarRating/StarRating";
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";
import NoResults from "../../common/components/NoResults/NoResults";

const PreviewReviews = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const reviews = useSelector(selectReviews);

    const [confirmDeleteReviewId, setConfirmDeleteReviewId] = useState(null);

    useEffect(() => {
        if (!userId) return;

        getReviewsByUserId(userId)
            .then(data => dispatch(setReviews(data)));
    }, [userId]);

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

    const handleExpandClick = (reviewId, restaurantId) => {
        dispatch(selectReview(reviewId));
        navigate("/details/" + restaurantId);
    };

    return (
        <div className="preview-reviews-container">
            <ProfileNavigationView pageTitle="Reviews"/>

            <main className="reviews-container container">
                {reviews && reviews.length > 0 ? (
                    reviews.map(({ id, rating, title, content, restaurantId, restaurantName, photoUrl }) => (
                        <div key={id} className="review-card">
                            {confirmDeleteReviewId === id && (
                                <div className="confirm-delete-popup">
                                    <p>Delete this review?</p>

                                    <div className="buttons-container">
                                        <button onClick={handleYesClick}>Yes</button>
                                        <button onClick={handleNoClick}>No</button>
                                    </div>
                                </div>
                            )}

                            <div className="container-lhs">
                                <RestaurantImage photoUrl={photoUrl} name={restaurantName} />

                                <div className="preview">
                                    <h3 style={{ margin: 0 }}>{title}</h3>

                                    <StarRating rating={rating} />

                                    <p>{content}</p>
                                </div>
                            </div>

                            <div className="container-rhs">
                                <button onClick={() => handleExpandClick(id, restaurantId)}>
                                    <FontAwesomeIcon className="icon" icon={faUpRightAndDownLeftFromCenter} />
                                </button>

                                <button onClick={() => handleDeleteClick(id)}>
                                    <FontAwesomeIcon icon={faTrash} className="icon" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <NoResults mainText="You haven't written any reviews yet." subText="Write some restaurant reviews, and view them here!"/>
                )}
            </main>
        </div>
    );  
};

export default PreviewReviews;