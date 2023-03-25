import "./Slider.css";
import RestaurantsList from "../../restaurants/RestaurantsList/RestaurantsList";
import {useSwipeable} from "react-swipeable";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeSlide, selectActiveSlide} from "../sliderSlice";
import {displayRestaurant} from "../../map/mapSlice";
import {selectRestaurants} from "../../restaurants/restaurantsSlice";

const Slider = () => {

    const dispatch = useDispatch();
    const activeSlide = useSelector(selectActiveSlide);
    const restaurants = useSelector(selectRestaurants);

    const position = window.innerWidth > 500 ? 500 : window.innerWidth;
    const offset = (window.innerWidth - position) / 2;

    const handlers = useSwipeable({
        onSwipedLeft: () => dispatch(changeSlide("forward")),
        onSwipedRight: () => dispatch(changeSlide("backward")),
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    useEffect(() => {
        setStyle(style => {
            const updatedStyle = {...style};
            updatedStyle.transform = `translateX(${offset - (activeSlide * position)}px)`;
            return updatedStyle;
        });

        if (!restaurants) return;

        dispatch(displayRestaurant(restaurants[activeSlide]));
    }, [activeSlide]);

    const [style, setStyle] = useState({});

    return (
        <div className="slider" {...handlers} style={style}>
            <div className="restaurant-cards-container">
                <RestaurantsList view="map"/>
            </div>
        </div>
    );
};

export default Slider;