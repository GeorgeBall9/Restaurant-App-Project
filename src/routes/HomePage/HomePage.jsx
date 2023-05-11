/*
 Description: Home page component.
 Author: Ryan Henzell-Hill
 Contact: ryan.henzell-hill@outlook.com
 */
// stylesheet
import "./HomePage.css";
// Import dependencies
import Navigation from "../../common/components/navigations/Navigation/Navigation";
import NoResults from "../../common/components/NoResults/NoResults";
import { useDispatch, useSelector } from "react-redux";
import {
    selectRestaurants,
    selectRestaurantsFetchStatus,
    setRestaurants
} from "../../features/restaurants/restaurantsSlice";
import { getRestaurantById } from "../../firebase/firebase";
import { useEffect, useRef, useState } from "react";
import { hideSpinner, showSpinner } from "../../features/spinner/spinnerSlice";
import HomeCard from "./HomeCard/HomeCard";

const HomePage = () => {

    const dispatch = useDispatch();
    const fetchStatus = useSelector(selectRestaurantsFetchStatus);
    const restaurants = useSelector(selectRestaurants);

    const cardsContainerRef = useRef();

    const [restaurantsUpdatedByDB, setRestaurantsUpdatedByDB] = useState(false);
    const [navHeight, setNavHeight] = useState(null);

    // Show spinner when fetching data
    useEffect(() => {
        if (fetchStatus === "pending") {
            dispatch(showSpinner());
        } else if (fetchStatus === "idle") {
            dispatch(hideSpinner());
        }
    }, [fetchStatus]);

    // Fetch restaurant data from DB
    const fetchRestaurantDataFromDB = async () => {
        return Promise.all(restaurants
            .map(async (restaurant) => await getRestaurantById(restaurant.id) || restaurant));
    };

    // Update restaurants in state with data from DB
    useEffect(() => {
        if (restaurantsUpdatedByDB || !restaurants) return;

        fetchRestaurantDataFromDB()
            .then(results => {
                dispatch(setRestaurants(results));
                setRestaurantsUpdatedByDB(true);
            });
    }, [restaurants]);

    // Check if restaurant is highly recommended
    const checkHighlyRecommended = (restaurant) => {
        return restaurant.recommendations >= 10;
    };

    // Set margin top of cards container to nav height
    useEffect(() => {
        if (!cardsContainerRef || !navHeight) return;

        cardsContainerRef.current.style.marginTop = 16 + navHeight + "px";
    }, [navHeight]);

    return (
        <div className="home container">
            <Navigation view="home" setNavHeight={setNavHeight} />

            <div ref={cardsContainerRef} className="restaurant-cards-container">
                {restaurants && (
                    restaurants.map(restaurant => (
                        <HomeCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            highlyRecommended={checkHighlyRecommended(restaurant)}
                        />
                    ))
                )}

                {fetchStatus === "idle" && !restaurants?.length && (
                    <NoResults
                        mainText="No restaurants found."
                        subText="Why not try looking for something else?"
                    />
                )}

                {fetchStatus === "fail" && (
                    <NoResults
                        mainText="Something went wrong!"
                        subText="Please check back later"
                    />
                )}
            </div>
        </div>
    );
};

export default HomePage;
