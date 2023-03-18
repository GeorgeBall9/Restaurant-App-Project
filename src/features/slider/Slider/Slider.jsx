import "./Slider.css";
import RestaurantsList from "../../restaurants/RestaurantsList/RestaurantsList";
import {useDispatch, useSelector} from "react-redux";
import {changeSlide, selectActiveSlide, selectLastSlide} from "../sliderSlice";
import {selectRouteDetails} from "../../map/mapSlice";
import {useState} from "react";

const Slider = () => {

    const dispatch = useDispatch();

    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);
    const activeSlide = useSelector(selectActiveSlide);
    const lastSlide = useSelector(selectLastSlide);

    const handleBackClick = () => {dispatch(changeSlide("backward"))};

    const handleNextClick = () => {dispatch(changeSlide("forward"))};

    const backVisibility = {visibility: activeSlide === 0 ? "hidden" : "visible"};

    const forwardVisibility = {visibility: activeSlide === lastSlide ? "hidden" : "visible"}

    return (
        <div className="slider">
            {!routeCoordinates && <div className="buttons-container">
                <button style={backVisibility} onClick={handleBackClick}>Back</button>
                <button style={forwardVisibility} onClick={handleNextClick}>Next</button>
            </div>}

            <div className="restaurant-cards-container">
                <RestaurantsList view="map"/>
            </div>
        </div>
    );
};

export default Slider;