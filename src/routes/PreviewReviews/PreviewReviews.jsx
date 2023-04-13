import "./PreviewReviews.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {getReviewsByUserId} from "../../firebase/firebase";
import {selectReviews, setReviews} from "../../features/reviews/reviewsSlice";
import RestaurantImage from "../../common/components/RestaurantImage/RestaurantImage";
import StarRating from "../../common/components/RestaurantCard/StarRating/StarRating";

const PreviewReviews = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const reviews = useSelector(selectReviews);

    useEffect(() => {
        if (!userId) return;

        getReviewsByUserId(userId)
            .then(data => dispatch(setReviews(data)));
    }, [userId]);

    const handleBackClick = () => {
        navigate("/profile");
    };

    useEffect(() => {
        console.log(reviews);
    }, [reviews]);

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
                {reviews && reviews.map(({id, rating, title, content, restaurantName, photoUrl}) => (
                    <div key={id} className="review-card">
                        <div className="container-lhs">
                            <RestaurantImage photoUrl={photoUrl} name={restaurantName}/>

                            <div className="preview">
                                <h3>{title}</h3>
                                <StarRating rating={rating}/>

                                <p>{content}</p>
                            </div>
                        </div>

                        <div className="container-rhs">
                            <button onClick={() => console.log("deleting review")}>
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