import RestaurantCard from "../../common/components/RestaurantCard/RestaurantCard";

import {useDispatch, useSelector} from "react-redux";
import {
    fetchRestaurants,
    selectRestaurants,
    selectRestaurantsFetchStatus
} from "../../features/restaurants/restaurantsSlice";
import SearchBar from "../../common/components/SearchBar/SearchBar";
import {useEffect, useState} from "react";

const Home = () => {

    const restaurantsStatus = useSelector(selectRestaurantsFetchStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (restaurantsStatus !== "idle") return;

        dispatch(fetchRestaurants());
    }, []);

    const restaurants = useSelector(selectRestaurants);

    return (
        <div className="home">
            <h1>Restaurant App</h1>

            <SearchBar/>

            {restaurants && restaurants.map(restaurant => (
                <RestaurantCard {...restaurant} openingHours={restaurant.hours[0]} view="home"/>
            ))}
        </div>
    );
}

export default Home;
