import "./PreviewReviews.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {getReviewsByUserId} from "../../firebase/firebase";
import {selectReviews, setReviews} from "../../features/reviews/reviewsSlice";
import RestaurantImage from "../../common/components/RestaurantImage/RestaurantImage";

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
                {reviews && reviews.map(({id, title, content, restaurantName, photoUrl}) => (
                    <div key={id} className="review-card">
                        <RestaurantImage photoUrl={photoUrl} name={restaurantName}/>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default PreviewReviews;