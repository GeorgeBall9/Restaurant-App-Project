import RestaurantCard from "../../common/components/RestaurantCard/RestaurantCard";

import {useDispatch, useSelector} from "react-redux";
import {
    fetchRestaurants,
    selectRestaurants,
    selectRestaurantsFetchStatus
} from "../../features/restaurants/restaurantsSlice";
import SearchBar from "../../common/components/SearchBar/SearchBar";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "./Home.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faLocationDot} from "@fortawesome/free-solid-svg-icons";

const Home = () => {

    const restaurantsStatus = useSelector(selectRestaurantsFetchStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (restaurantsStatus !== "idle") return;

        dispatch(fetchRestaurants());
    }, []);

    const restaurants = useSelector(selectRestaurants);

    const navigate = useNavigate();

    const handleGoToMapClicked = () => navigate("/map");

    return (
        <div className="home container">
            <div className="search-bar-container">
                <button className="back-button" onClick={handleGoToMapClicked}>
                    <FontAwesomeIcon className="icon" icon={faLocationDot}/>
                </button>

                <SearchBar/>
            </div>

            {restaurants && restaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} {...restaurant} openingHours={restaurant.hours[0]} view="home"/>
            ))}
        </div>
    );
}

export default Home;
