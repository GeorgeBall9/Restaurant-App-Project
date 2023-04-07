import "./Slider.css";
import RestaurantsList from "../../restaurants/RestaurantsList/RestaurantsList";
import {useSwipeable} from "react-swipeable";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeSlide, selectActiveSlide, selectLastSlide, selectSliderIsActive} from "../sliderSlice";
import {displayRestaurant} from "../../map/mapSlice";
import {selectRestaurants} from "../../restaurants/restaurantsSlice";

const Slider = () => {

    const dispatch = useDispatch();

    const activeSlide = useSelector(selectActiveSlide);
    const lastSlide = useSelector(selectLastSlide);
    const restaurants = useSelector(selectRestaurants);
    const sliderIsActive = useSelector(selectSliderIsActive);

    const positionRef = useRef(window.innerWidth > 500 ? 500 : window.innerWidth);
    const offsetRef = useRef((window.innerWidth - positionRef.current) / 2);

    const [xPosition, setXPosition] = useState(offsetRef.current);
    const [offsetX, setOffsetX] = useState(0);
    const [style, setStyle] = useState({});

    const updateStyle = useCallback(() => {
        requestAnimationFrame(() => {
            setStyle(style => {
                const updatedStyle = {...style};
                const translateX = offsetRef.current - (activeSlide * positionRef.current);
                updatedStyle.transform = `translateX(${translateX}px)`;
                setXPosition(translateX);
                return updatedStyle;
            });
        });
    }, [activeSlide, positionRef.current, offsetRef.current]);

    const handlers = useSwipeable({
        onSwiping: ({deltaX}) => {
            requestAnimationFrame(() => {
                setStyle(style => {
                    const updatedStyle = {...style};
                    const translateX = xPosition + deltaX;
                    setOffsetX(deltaX);
                    updatedStyle.transform = `translateX(${translateX}px)`;
                    return updatedStyle;
                });
            });
        },
        onTouchEndOrOnMouseUp: ({ velocity, dir }) => {
            const magnitude = Math.abs(offsetX);
            const isQuickForwardSwipe = dir === "Left" && Math.abs(velocity) > 0.4;
            const isQuickBackwardSwipe = dir === "Right" && Math.abs(velocity) > 0.4;

            if (!sliderIsActive || activeSlide === 0 && offsetX > 0 || activeSlide === lastSlide && offsetX < 0) {
                updateStyle();
            } else if (isQuickForwardSwipe || (offsetX < 0 && magnitude >= 0.4 * positionRef.current)) {
                dispatch(changeSlide("forward"));
            } else if (isQuickBackwardSwipe || magnitude >= 0.4 * positionRef.current) {
                dispatch(changeSlide("backward"));
            } else {
                updateStyle();
            }

            setOffsetX(0);
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
        trackTouch: true
    });

    useEffect(() => {
        updateStyle();

        if (!restaurants) return;

        dispatch(displayRestaurant(restaurants[activeSlide]));
    }, [activeSlide]);

    return (
        <div className="slider" {...handlers} style={style}>
            <div className="restaurant-cards-container">
                <RestaurantsList view="map"/>
            </div>
        </div>
    );
};

export default Slider;