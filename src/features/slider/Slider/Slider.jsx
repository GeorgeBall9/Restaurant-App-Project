import "./Slider.css";
import RestaurantsList from "../../restaurants/RestaurantsList/RestaurantsList";
import {useSwipeable} from "react-swipeable";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeSlide, selectActiveSlide, selectLastSlide} from "../sliderSlice";
import {displayRestaurant} from "../../map/mapSlice";
import {selectRestaurants} from "../../restaurants/restaurantsSlice";

const Slider = () => {

    const dispatch = useDispatch();
    const activeSlide = useSelector(selectActiveSlide);
    const lastSlide = useSelector(selectLastSlide);
    const restaurants = useSelector(selectRestaurants);

    const position = window.innerWidth > 500 ? 500 : window.innerWidth;
    const offset = (window.innerWidth - position) / 2;

    const [xPosition, setXPosition] = useState(offset);
    const [offsetX, setOffsetX] = useState(0);

    const updateStyle = () => {
        setStyle(style => {
            const updatedStyle = {...style};
            const translateX = offset - (activeSlide * position);
            updatedStyle.transform = `translateX(${translateX}px)`;
            setXPosition(translateX);
            return updatedStyle;
        });
    }

    const handlers = useSwipeable({
        onSwiping: ({deltaX}) => {
            setStyle(style => {
                const updatedStyle = {...style};
                const translateX = xPosition + deltaX;
                setOffsetX(deltaX);
                updatedStyle.transform = `translateX(${translateX}px)`;
                return updatedStyle;
            });
        },
        onTouchEndOrOnMouseUp: () => {
            const magnitude = Math.abs(offsetX);

            if (activeSlide === 0 && offsetX > 0 || activeSlide === lastSlide && offsetX < 0) {
                updateStyle();
            } else if (offsetX < 0 && magnitude > 0.25 * position) {
                dispatch(changeSlide("forward"));
            } else if (magnitude > 0.25 * position) {
                dispatch(changeSlide("backward"));
            } else {
                updateStyle();
            }
        },
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    useEffect(() => {
        updateStyle();

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