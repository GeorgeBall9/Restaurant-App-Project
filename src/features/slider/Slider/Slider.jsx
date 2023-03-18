import "./Slider.css";
import RestaurantsList from "../../restaurants/RestaurantsList/RestaurantsList";
import {useDispatch, useSelector} from "react-redux";
import {changeSlide} from "../sliderSlice";
import {selectRouteDetails} from "../../map/mapSlice";

const Slider = () => {

    const dispatch = useDispatch();

    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);

    const handleBackClick = () => {
        dispatch(changeSlide("backward"));
    };

    const handleNextClick = () => {
        dispatch(changeSlide("forward"));
    };

    return (
        <div className="slider">
            {!routeCoordinates && <div className="buttons-container">
                <button onClick={handleBackClick}>Back</button>
                <button onClick={handleNextClick}>Next</button>
            </div>}

            <div className="restaurant-cards-container">
                <RestaurantsList view="map"/>
            </div>
        </div>
    );
};

export default Slider;