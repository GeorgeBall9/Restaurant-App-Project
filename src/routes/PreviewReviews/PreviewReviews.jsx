import "./PreviewReviews.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faExpand, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {deleteRestaurantReview, getReviewsByUserId} from "../../firebase/firebase";
import {deleteReview, selectReviews, setReviews} from "../../features/reviews/reviewsSlice";
import RestaurantImage from "../../common/components/RestaurantImage/RestaurantImage";
import StarRating from "../../common/components/RestaurantCard/StarRating/StarRating";

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

    const handleBackClick = () => {
        navigate("/profile");
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

    const handleExpandClick = (restaurantId) => {
        navigate("/details/" + restaurantId);
    };

    return (
        <div className="preview-reviews-container">
            <header>
                <div className="container">
                    <button onClick={handleBackClick}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>

                    <h1>Reviews</h1>

                    <button  style={{visibility: "hidden"}}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>
                </div>
            </header>

            <main className="reviews-container container">
                {reviews && reviews.map(({id, rating, title, content, restaurantId, restaurantName, photoUrl}) => (
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
                            <RestaurantImage photoUrl={photoUrl} name={restaurantName}/>

                            <div className="preview">
                                <h3 style={{margin: 0}}>{title}</h3>
                                <StarRating rating={rating}/>

                                <p>{content}</p>
                            </div>
                        </div>

                        <div className="container-rhs">
                            <button onClick={() => handleExpandClick(restaurantId)}>
                                <FontAwesomeIcon icon={faExpand} className="icon"/>
                            </button>

                            <button onClick={() => handleDeleteClick(id)}>
                                <FontAwesomeIcon icon={faTrash} className="icon"/>
                            </button>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default PreviewReviews;