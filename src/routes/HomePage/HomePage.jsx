import "./HomePage.css";
import Navigation from "../../common/components/Navigation/Navigation";
import NoResults from "../../common/components/NoResults/NoResults";
import {useDispatch, useSelector} from "react-redux";
import {
    selectRestaurants,
    selectRestaurantsFetchStatus,
    setRestaurants
} from "../../features/restaurants/restaurantsSlice";
import {getRestaurantById} from "../../firebase/firebase";
import {useEffect, useState} from "react";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import HomeCard from "./HomeCard/HomeCard";

const HomePage = () => {

    const dispatch = useDispatch();
    const fetchStatus = useSelector(selectRestaurantsFetchStatus);
    const restaurants = useSelector(selectRestaurants);

    const [restaurantsUpdatedByDB, setRestaurantsUpdatedByDB] = useState(false);

    useEffect(() => {
        if (fetchStatus === "pending") {
            dispatch(showSpinner());
        } else if (fetchStatus === "idle") {
            dispatch(hideSpinner());
        }
    }, [fetchStatus, restaurants]);

    const fetchRestaurantDataFromDB = async () => {
        return Promise.all(restaurants
            .map(async (restaurant) => await getRestaurantById(restaurant.id) || restaurant));
    };

    useEffect(() => {
        if (restaurantsUpdatedByDB || !restaurants) return;

        fetchRestaurantDataFromDB()
            .then(results => {
                dispatch(setRestaurants(results));
                setRestaurantsUpdatedByDB(true);
            });
    }, [restaurants]);

    const checkHighlyRecommended = (restaurant) => {
        return restaurant.recommendations >= 10;
    };

    return (
        <div className="home container">
            <Navigation view="home"/>

            <div className="restaurant-cards-container">
                {restaurants && (
                    restaurants.map(restaurant => (
                        <HomeCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            highlyRecommended={checkHighlyRecommended(restaurant)}
                        />
                    ))
                )}

                {fetchStatus === "idle" && !restaurants && (
                    <NoResults
                        mainText="No restaurants found."
                        subText="Why not try looking for something else?"
                    />
                )}
            </div>
        </div>
    );
};

export default HomePage;
