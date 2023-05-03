import "./ReviewsPage.css";
import ReviewsList from "../../common/components/ReviewsList/ReviewsList";
import ReviewForm from "../../common/components/ReviewForm/ReviewForm";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectReviews, selectSortFilter, setReviews} from "../../features/reviews/reviewsSlice";
import {useEffect, useState} from "react";
import {getRestaurantById, getReviewsByRestaurantId} from "../../firebase/firebase";
import {selectUserId} from "../../features/user/userSlice";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import {selectAllRestaurants} from "../../features/restaurants/restaurantsSlice";
import {
    faChevronDown,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {selectSearchQuery} from "../../features/filters/filtersSlice"
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";
import SortFilterButton from "../../common/components/SortFilterButton/SortFilterButton";
import SortFiltersView from "./SortFiltersView/SortFiltersView";

const ReviewsPage = () => {

    const {id: restaurantId} = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const reviews = useSelector(selectReviews);
    const allRestaurants = useSelector(selectAllRestaurants);
    const searchQuery = useSelector(selectSearchQuery);
    const sortFilterSelected = useSelector(selectSortFilter);

    const [displayedReviews, setDisplayedReviews] = useState(null);
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const [sortFiltersVisible, setSortFiltersVisible] = useState(false);
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [searchHasMatches, setSearchHasMatches] = useState(true);
    const [sortFilters, setSortFilters] = useState([
        {text: "Highest rated", active: true},
        {text: "Lowest rated", active: false},
        {text: "Most recent", active: false},
        {text: "Oldest", active: false}
    ]);

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
        if (!restaurantId || reviews?.length) return;

        getReviewsByRestaurantId(restaurantId)
            .then(reviewsFound => dispatch(setReviews(reviewsFound)));
    }, [restaurantId, reviews]);

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

    const handleSortClick = () => {
        setSortFiltersVisible(sortFiltersVisible => !sortFiltersVisible);
    };

    const handleSearchClick = () => {
        setSearchIsVisible(searchIsVisible => !searchIsVisible);
    };

    const handleSearchInputChange = (query) => {
        const lowerCaseQuery = query.toLowerCase();

        const results = reviews
            .filter(({title, content}) => title.toLowerCase().includes(lowerCaseQuery)
                || content.toLowerCase().includes(lowerCaseQuery));

        if (results.length) {
            setDisplayedReviews(results);
            setSearchHasMatches(true);
        } else {
            setDisplayedReviews(reviews);
            setSearchHasMatches(false);
        }
    };

    return (
        <div className="reviews-page">
            <ProfileNavigationView
                pageTitle="Reviews"
                button2={{
                    text: searchIsVisible ? "Cancel" : "Search",
                    icon: !searchIsVisible ? faMagnifyingGlass : null,
                    handler: handleSearchClick
                }}
                lowerNav={true}
                searchFunctionality={searchIsVisible}
                button3={{
                    text: isReviewFormVisible ? "Close Review Form" : "Write a Review",
                    handler: handleWriteReviewClick
                }}
                button4={{
                    text: "Sort",
                    icon: faChevronDown,
                    handler: handleSortClick
                }}
                handleSearchInputChange={handleSearchInputChange}
                hasMatches={searchHasMatches}
            />

            {sortFiltersVisible && (
                <SortFiltersView filters={sortFilters} handleClick={() => console.log("click")}/>
            )}

            <main className="container">
                {isReviewFormVisible && (
                    <ReviewForm restaurant={restaurant} userId={userId}/>
                )}

                <ReviewsList reviews={displayedReviews} userId={userId}/>
            </main>
        </div>
    );
};

export default ReviewsPage;