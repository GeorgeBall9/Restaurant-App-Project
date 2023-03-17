import "./Slider.css";
import RestaurantsList from "../../restaurants/RestaurantsList/RestaurantsList";
import {useDispatch, useSelector} from "react-redux";
import {changeSlide, selectActiveSlide} from "../sliderSlice";
import {useEffect} from "react";

const Slider = () => {

    const dispatch = useDispatch();

    const handleBackClick = () => {
        dispatch(changeSlide("backward"));
    };

    const handleNextClick = () => {
        dispatch(changeSlide("forward"));
    };

    const activeSlide = useSelector(selectActiveSlide);

    useEffect(() => {
        if (!activeSlide) return;

        console.log(activeSlide)
    }, [activeSlide]);

    return (
        <div className="slider">
            <div className="buttons-container">
                <button onClick={handleBackClick}>Back</button>
                <button onClick={handleNextClick}>Next</button>
            </div>

            <div className="restaurant-cards-container">
                <RestaurantsList/>
            </div>
        </div>
    );
};

export default Slider;