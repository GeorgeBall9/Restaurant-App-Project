import RestaurantCard from "../../common/components/RestaurantCard/RestaurantCard";

import {useDispatch, useSelector} from "react-redux";
import {
    fetchRestaurants,
    selectRestaurants,
    selectRestaurantsFetchStatus
} from "../../features/restaurants/restaurantsSlice";
import SearchBar from "../../common/components/SearchBar/SearchBar";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import "./Home.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMap, faMapLocationDot} from "@fortawesome/free-solid-svg-icons";
import Navigation from "../../common/components/Navigation/Navigation";

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
            <Navigation handleButtonClick={handleGoToMapClicked} view="home"/>

            <div className="restaurant-cards-container">
                {restaurants && restaurants.map(restaurant => (
                    <RestaurantCard
                        key={restaurant.id}
                        {...restaurant}
                        openingHours={restaurant.hours[0]}
                        view="home"
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
