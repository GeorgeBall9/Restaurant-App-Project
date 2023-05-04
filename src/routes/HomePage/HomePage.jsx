import "./HomePage.css";
import Navigation from "../../common/components/Navigation/Navigation";
import RestaurantsList from "../../features/restaurants/RestaurantsList/RestaurantsList";
import NoResults from "../../common/components/NoResults/NoResults";
import {useDispatch, useSelector} from "react-redux";
import {
    selectRestaurants,
    selectRestaurantsFetchStatus, setRestaurants,
    updateRestaurant
} from "../../features/restaurants/restaurantsSlice";
import {getRestaurantById} from "../../firebase/firebase";
import {useEffect, useState} from "react";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import HomeCard from "./HomeCard/HomeCard";

const HomePage = () => {

    const dispatch = useDispatch();
    const fetchStatus = useSelector(selectRestaurantsFetchStatus);
    const restaurants = useSelector(selectRestaurants);

    const [displayedRestaurants, setDisplayedRestaurants] = useState(null);

    useEffect(() => {
        if (fetchStatus === "pending") {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [fetchStatus]);

    const fetchRestaurantDataFromDB = async () => {
        return Promise.all(restaurants
            .map(async (restaurant) => await getRestaurantById(restaurant.id) || restaurant));
    };

    useEffect(() => {
        if (restaurants) {
            fetchRestaurantDataFromDB()
                .then(results => {
                    setDisplayedRestaurants(results)
                    console.log({results})
                });
        }
    }, [restaurants]);

    const checkHighlyRecommended = (restaurant) => {
        return restaurant.recommendations >= 10;
    };

    return (
        <div className="home container">
            <Navigation view="home"/>

            <div className="restaurant-cards-container">
                {displayedRestaurants ? (
                    displayedRestaurants.map(restaurant => (
                        <HomeCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            highlyRecommended={checkHighlyRecommended(restaurant)}
                        />
                    ))
                ) : (
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
