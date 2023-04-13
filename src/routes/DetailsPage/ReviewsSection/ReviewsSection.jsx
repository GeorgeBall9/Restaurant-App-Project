import "./ReviewsSection.css";
import ReviewsList from "../ReviewsList/ReviewsList";
import ReviewForm from "../ReviewForm/ReviewForm";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getReviewsByRestaurantId} from "../../../firebase/firebase";
import reviewsList from "../ReviewsList/ReviewsList";

const ReviewsSection = ({userId, restaurant}) => {

    const restaurantId = restaurant?.id;

    const navigate = useNavigate();

    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        if (!restaurantId) return;

        getReviewsByRestaurantId(restaurantId)
            .then(reviewsFound => {
                reviewsFound.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
                console.log(reviewsFound)
                setReviews(reviewsFound);
            });
    }, [restaurantId]);

    const handleWriteReviewClick = () => {
        if (!userId) {
            navigate("/sign-in");
        } else {
            setIsReviewFormVisible(!isReviewFormVisible);
        }
    };

    const handleSubmitReview = (review) => {
        setReviews([review, ...reviews]);
    };

    return (
        <div className="restaurant-reviews">
            <h2>Reviews</h2>

            <ReviewsList reviews={reviews} userId={userId}/>

            <button
                className="write-review-button"
                onClick={handleWriteReviewClick}
            >
                {isReviewFormVisible ? "Close Review Form" : "Write a Review"}
            </button>

            {isReviewFormVisible && (
                <ReviewForm restaurant={restaurant} userId={userId} handleSubmitReview={handleSubmitReview}/>
            )}
        </div>
    );
};

export default ReviewsSection;