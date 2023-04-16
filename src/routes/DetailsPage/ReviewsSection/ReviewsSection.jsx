import "./ReviewsSection.css";
import ReviewsList from "./ReviewsList/ReviewsList";
import ReviewForm from "./ReviewForm/ReviewForm";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getReviewsByRestaurantId} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {selectReviews, setReviews} from "../../../features/reviews/reviewsSlice";
import SearchBox from "../../../common/components/SearchBox/SearchBox";
import StarRating from "../../../common/components/StarRating/StarRating";

import sortImageSrc from "../../../common/images/sort.png";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 1,
            borderSkipped: false,
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            display: false,
            stacked: true
        },
        y: {
            grid: {
                display: false
            },
            border: {
                display: false
            },
            stacked: true
        }
    }
};

const labels = [5, 4, 3, 2, 1];

export const data = {
    labels,
    datasets: [
        {
            data: [5, 6, 19, 3, 2],
            borderColor: '#C23B22',
            backgroundColor: '#C23B22',
            barPercentage: 1,
            categoryPercentage: 1,
            maxBarThickness: 8,
            borderRadius: 8,
        },
        {
            data: [14, 13, 0, 16, 17],
            borderColor: 'black',
            backgroundColor: 'white',
            barPercentage: 1,
            categoryPercentage: 1,
            maxBarThickness: 8,
            borderRadius: {
                topRight: 8,
                bottomRight: 8
            },
        }
    ],
};

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

            <div className="review-stats">
                <div className="rating-container">
                    <h3>Overall rating</h3>

                    <p>{restaurant.rating}</p>

                    <StarRating rating={restaurant.rating} hideNumber={true}/>
                </div>

                <div className="chart-container">
                    <Bar options={options} data={data}/>
                </div>
            </div>

            <div className="search-container">
                <SearchBox/>

                <button>
                    <img src={sortImageSrc} alt="sort"/>
                </button>
            </div>

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