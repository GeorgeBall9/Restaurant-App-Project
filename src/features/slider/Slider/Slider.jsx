import "./Slider.css";
import RestaurantsList from "../../restaurants/RestaurantsList/RestaurantsList";
import {useDispatch, useSelector} from "react-redux";
import {changeSlide, selectActiveSlide, selectLastSlide} from "../sliderSlice";
import {resetRoute, selectDisplayedRestaurant, selectRouteDetails} from "../../map/mapSlice";
import {useEffect, useState} from "react";
import RestaurantCard from "../../../common/components/RestaurantCard/RestaurantCard";

const Slider = () => {

    const dispatch = useDispatch();

    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);
    const activeSlide = useSelector(selectActiveSlide);
    const lastSlide = useSelector(selectLastSlide);

    const handleBackClick = () => dispatch(changeSlide("backward"));

    const handleNextClick = () => dispatch(changeSlide("forward"));

    const handleShowAllClick = () => dispatch(resetRoute());

    const backVisibility = {visibility: routeCoordinates || activeSlide === 0 ? "hidden" : "visible"};

    const showAllVisibility = {visibility: !routeCoordinates ? "hidden" : "visible"};

    const forwardVisibility = {visibility: routeCoordinates || activeSlide === lastSlide ? "hidden" : "visible"};

    useEffect(() => {
        console.log(routeCoordinates !== null)
        console.log(showAllVisibility)
    }, [routeCoordinates]);

    return (
        <div className="slider">
            <div className="buttons-container">
                <button style={backVisibility} onClick={handleBackClick}>Back</button>
                <button style={showAllVisibility} onClick={handleShowAllClick}>Show All</button>
                <button style={forwardVisibility} onClick={handleNextClick}>Next</button>
            </div>

            <div className="restaurant-cards-container">
                <RestaurantsList view="map"/>
            </div>
        </div>
    );
};

export default Slider;