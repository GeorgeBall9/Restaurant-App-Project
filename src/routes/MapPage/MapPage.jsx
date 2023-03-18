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
import {
    displayRestaurant,
    resetDisplayedRestaurant,
    resetRoute,
    selectDisplayedRestaurant,
    selectRouteDetails
} from "../../features/map/mapSlice";

import {useNavigate} from "react-router-dom";
import Navigation from "../../common/components/Navigation/Navigation";
import useFetchRestaurants from "../../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../../common/hooks/useFilterRestaurants";
import RestaurantsList from "../../features/restaurants/RestaurantsList/RestaurantsList";
import Slider from "../../features/slider/Slider/Slider";
import useInitialiseSlider from "../../common/hooks/useInitialiseSlider";
import {useEffect} from "react";
import {selectActiveSlide} from "../../features/slider/sliderSlice";

const MapPage = () => {

    useInitialiseSlider();

    const dispatch = useDispatch();

    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);

    const navigate = useNavigate();

    const handleBackButtonClick = () => navigate("/");

    const handleShowAllClick = () => {
        dispatch(resetRoute());
    };

    return (
        <div className="map-page-container">
            <div className="nav-and-back-button">
                <Navigation handleButtonClick={handleBackButtonClick} view="map"/>
                {routeCoordinates && <button onClick={handleShowAllClick}>Show All</button>}
            </div>

            <Map/>

            <Slider/>
        </div>
    );
};

export default MapPage;