import "./ReviewsSection.css";
import ReviewsList from "../../../common/components/ReviewsList/ReviewsList";
import ReviewForm from "./ReviewForm/ReviewForm";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getReviewsByRestaurantId} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {selectReviews, setReviews} from "../../../features/reviews/reviewsSlice";
import StarRating from "../../../common/components/StarRating/StarRating";
import ReviewsGraph from "./ReviewsGraph/ReviewsGraph";
import {options} from "../../../features/restaurants/restaurantsSlice";
import {faCircleQuestion} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

const ReviewsSection = ({userId, restaurant}) => {

    const restaurantId = restaurant?.id;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const reviews = useSelector(selectReviews);

    const [displayedReviews, setDisplayedReviews] = useState(null);
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [reviewsHistogram, setReviewsHistogram] = useState(null);
    const [allReviewsVisible, setAllReviewsVisible] = useState(true);

    useEffect(() => {
        console.log(displayedReviews?.length)
        if (displayedReviews?.length > 3) {
            setAllReviewsVisible(false);
        }
    }, [displayedReviews]);

    useEffect(() => {
        console.log({allReviewsVisible})
    }, [allReviewsVisible]);

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

    useEffect(() => {
        if (!restaurant || reviewsHistogram) return;

        // const url = "https://travel-advisor.p.rapidapi.com/restaurants/get-details?location_id=" + restaurant.id +
        //     "&currency=USD&lang=en_US";
        //
        // fetch(url, options)
        //     .then(response => response.json())
        //     .then(data => {
        //         const histogram = data.rating_histogram;
        //         setReviewsHistogram({...histogram, totalReviews: +data.num_reviews})
        //     })
        //     .catch(err => console.error(err));

        const reviewsData = {
            count_1: "34",
            count_2: "71",
            count_3: "165",
            count_4: "449",
            count_5: "1213",
            totalReviews: 1932
        };

        setReviewsHistogram({...reviewsData});
    }, [restaurant]);

    return (
        <div className="restaurant-reviews">
            <h2>Reviews</h2>

            {displayedReviews?.length > 0 && (
                <div className="review-stats-container">
                    <div className="review-stats">
                        <div className="rating-container">
                            <p>
                                {restaurant.rating}

                                <button>
                                    <FontAwesomeIcon icon={faCircleQuestion} className="icon"/>
                                </button>
                            </p>

                            <StarRating rating={restaurant.rating} hideNumber={true}/>

                            {reviewsHistogram && <span>{reviewsHistogram.totalReviews} reviews</span>}
                        </div>

                        <div className="chart-container">
                            {reviewsHistogram && <ReviewsGraph reviewsHistogram={reviewsHistogram}/>}
                        </div>
                    </div>

                    {!allReviewsVisible && (
                        <button onClick={() => navigate("/reviews/" + restaurantId)}>
                            All reviews
                            <FontAwesomeIcon icon={faChevronRight} className="icon"/>
                        </button>
                    )}
                </div>
            )}

            <ReviewsList reviews={displayedReviews} userId={userId}/>

            {allReviewsVisible && (
                <button
                    className="write-review-button"
                    onClick={handleWriteReviewClick}
                >
                    {isReviewFormVisible ? "Close Review Form" : "Write a Review"}
                </button>
            )}

            {isReviewFormVisible && (
                <ReviewForm restaurant={restaurant} userId={userId}/>
            )}
        </div>
    );
};

export default ReviewsSection;