import "./Slider.css";
import RestaurantsList from "../../restaurants/RestaurantsList/RestaurantsList";
import {useDispatch} from "react-redux";
import {changeSlide} from "../sliderSlice";

const Slider = () => {

    const dispatch = useDispatch();

    const handleBackClick = () => {
        dispatch(changeSlide("backward"));
    };

    const handleNextClick = () => {
        dispatch(changeSlide("forward"));
    };

    return (
        <div className="slider">
            <div className="buttons-container">
                <button onClick={handleBackClick}>Back</button>
                <button onClick={handleNextClick}>Next</button>
            </div>

            <div className="restaurant-cards-container">
                <RestaurantsList view="map"/>
            </div>
        </div>
    );
};

export default Slider;