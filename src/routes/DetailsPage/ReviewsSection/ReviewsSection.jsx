import "./ReviewsSection.css";
import ReviewsList from "./ReviewsList/ReviewsList";
import ReviewForm from "./ReviewForm/ReviewForm";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getReviewsByRestaurantId} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {selectReviews, setReviews} from "../../../features/reviews/reviewsSlice";
import {faMagnifyingGlass, faPhone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchBox from "../../../common/components/SearchBox/SearchBox";

const ReviewsSection = ({userId, restaurant}) => {

    const restaurantId = restaurant?.id;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const reviews = useSelector(selectReviews);

    const [displayedReviews, setDisplayedReviews] = useState(null);
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

    useEffect(() => {
        if (!restaurantId) return;

        getReviewsByRestaurantId(restaurantId)
            .then(reviewsFound => dispatch(setReviews(reviewsFound)));
    }, [restaurantId]);

    useEffect(() => {
        if (!reviews) return;

        setDisplayedReviews(reviews);
    }, [reviews]);

    const handleWriteReviewClick = () => {
        if (!userId) {
            navigate("/sign-in");
        } else {
            setIsReviewFormVisible(!isReviewFormVisible);
        }
    };

    return (
        <div className="restaurant-reviews">
            <h2>Reviews</h2>

            <ReviewsList reviews={displayedReviews} userId={userId}/>

            <button
                className="write-review-button"
                onClick={handleWriteReviewClick}
            >
                {isReviewFormVisible ? "Close Review Form" : "Write a Review"}
            </button>

            {isReviewFormVisible && (
                <ReviewForm restaurant={restaurant} userId={userId}/>
            )}
        </div>
    );
};

export default ReviewsSection;