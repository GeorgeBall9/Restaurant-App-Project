import "./ReviewsPage.css";
import ReviewsList from "../../common/components/ReviewsList/ReviewsList";
import ReviewForm from "../DetailsPage/ReviewsSection/ReviewForm/ReviewForm";
import SearchBox from "../../common/components/SearchBox/SearchBox";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectReviews, setReviews} from "../../features/reviews/reviewsSlice";
import {useEffect, useState} from "react";
import {getRestaurantById, getReviewsByRestaurantId} from "../../firebase/firebase";
import {selectUserId} from "../../features/user/userSlice";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import {selectAllRestaurants} from "../../features/restaurants/restaurantsSlice";
import {faChevronDown, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {selectSearchQuery} from "../../features/filters/filtersSlice";
import SearchFeedback from "../../common/components/SearchBox/SearchFeedback/SearchFeedback";

const ReviewsPage = () => {

    const {id: restaurantId} = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const reviews = useSelector(selectReviews);
    const allRestaurants = useSelector(selectAllRestaurants);
    const searchQuery = useSelector(selectSearchQuery);

    const [displayedReviews, setDisplayedReviews] = useState(null);
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const [hasMatches, setHasMatches] = useState(true);

    useEffect(() => {
        if (!reviews) return;

        if (!searchQuery) {
            setDisplayedReviews(reviews);
            return;
        }

        const query = searchQuery.toLowerCase();

        const searchResults = reviews
            .filter(({title, content}) => (
                title.toLowerCase().includes(query) || content.toLowerCase().includes(query)
            ));

        if (!searchResults.length) {
            setHasMatches(false);
            setDisplayedReviews(reviews);
        } else {
            setDisplayedReviews(searchResults);
            setHasMatches(true);
        }
    }, [searchQuery, reviews]);

    useEffect(() => {
        if (!restaurant) {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [restaurant]);

    useEffect(() => {
        if (!allRestaurants) return;

        let foundRestaurant = allRestaurants.find(restaurant => restaurant.id === restaurantId);

        if (!foundRestaurant) {
            getRestaurantById(restaurantId)
                .then(data => setRestaurant(data));
        } else {
            setRestaurant(foundRestaurant);
        }
    }, [allRestaurants, restaurantId]);

    useEffect(() => {
        if (restaurant === undefined) {
            navigate('/error', {replace: true});
        }
    }, [restaurant, navigate]);

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
        <div className="reviews-page container">

            <header>
                <button onClick={() => navigate("/details/" + restaurantId)}>
                    <FontAwesomeIcon icon={faChevronLeft} className="icon"/>
                    Back
                </button>

                <h1>Reviews</h1>
            </header>

            <SearchBox matches={hasMatches} type="reviews"/>

            <div className="buttons-container">
                <button
                    className="write-review-button"
                    onClick={handleWriteReviewClick}
                >
                    {isReviewFormVisible ? "Close Review Form" : "Write a Review"}
                </button>

                <button className="reviews-sort-button">
                    Sort
                    <FontAwesomeIcon icon={faChevronDown} className="icon"/>
                </button>
            </div>

            {isReviewFormVisible && (
                <ReviewForm restaurant={restaurant} userId={userId}/>
            )}

            <ReviewsList reviews={displayedReviews} userId={userId}/>
        </div>
    );
};

export default ReviewsPage;