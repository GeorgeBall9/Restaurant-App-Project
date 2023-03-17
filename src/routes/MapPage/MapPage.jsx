/*
Description: Map component to be displayed in MapPage route
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// style sheet
import "./MapPage.css";

// imported components
import Map from "../../features/map/Map/Map";
import RestaurantCard from "../../common/components/RestaurantCard/RestaurantCard";

// redux imports
import {useDispatch, useSelector} from "react-redux";
import {resetDisplayedRestaurant, selectDisplayedRestaurant, selectRouteDetails} from "../../features/map/mapSlice";

import {useNavigate} from "react-router-dom";
import Navigation from "../../common/components/Navigation/Navigation";
import useFetchRestaurants from "../../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../../common/hooks/useFilterRestaurants";

const MapPage = () => {

    useFetchRestaurants();
    useFilterRestaurants();

    const dispatch = useDispatch();

    const displayedRestaurant = useSelector(selectDisplayedRestaurant);
    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);

    const navigate = useNavigate();

    const handleBackButtonClick = () => navigate("/");

    const handleShowAllClick = () => {
        dispatch(resetDisplayedRestaurant());
    };

    return (
        <div className="map-page-container">
            <div className="nav-and-back-button">
                <Navigation handleButtonClick={handleBackButtonClick} view="map"/>
                {routeCoordinates && <button onClick={handleShowAllClick}>Show All</button>}
            </div>

            <Map/>

            <div className="restaurant-cards-container">
                {displayedRestaurant && (
                    <RestaurantCard {...displayedRestaurant} openingHours={displayedRestaurant.hours[6]} view="map"/>
                )}
            </div>
        </div>
    );
};

export default MapPage;