import "./ReviewsSection.css";
import ReviewForm from "../../../common/components/ReviewForm/ReviewForm";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getReviewsByRestaurantId} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {selectReviews, setReviews} from "../../../features/reviews/reviewsSlice";
import ReviewsListView from "../../../common/components/ReviewsList/ReviewsListView/ReviewsListView";
import PrimaryButton from "../../../common/components/PrimaryButton/PrimaryButton";
import ReviewsStatsView from "./ReviewsStatsView/ReviewsStatsView";

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
        setAllReviewsVisible(displayedReviews?.length <= 3);
    }, [displayedReviews]);

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
        if (!restaurant || !displayedReviews?.length) return;

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
            totalReviews: 1932 + displayedReviews.length
        };

        setReviewsHistogram({...reviewsData});
    }, [restaurant, displayedReviews]);

    const handleAllReviewsClick = () => {
        navigate("/reviews/" + restaurantId);
    };

    return (
        <div className="restaurant-reviews">
            <h2>Reviews</h2>

            {reviewsHistogram && (
                <ReviewsStatsView
                    rating={restaurant.rating}
                    reviewsHistogram={reviewsHistogram}
                    tripAdvisorReviews={reviewsHistogram.totalReviews - displayedReviews.length}
                    appReviews={displayedReviews.length}
                    handleAllReviewsClick={handleAllReviewsClick}
                    allReviewsVisible={allReviewsVisible}
                />
            )}

            <ReviewsListView reviews={displayedReviews} userId={userId}/>

            {allReviewsVisible ? (
                <PrimaryButton
                    text={isReviewFormVisible ? "Close Review Form" : "Write a Review"}
                    handleClick={handleWriteReviewClick}
                />
            ) : (
                <PrimaryButton
                    text={"See all reviews"}
                    handleClick={handleAllReviewsClick}
                />
            )}

            {allReviewsVisible && isReviewFormVisible && (
                <ReviewForm restaurant={restaurant} userId={userId}/>
            )}
        </div>
    );
};

export default ReviewsSection;