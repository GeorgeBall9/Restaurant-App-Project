import "./Slider.css";
import RestaurantsList from "../../restaurants/RestaurantsList/RestaurantsList";
import {useDispatch, useSelector} from "react-redux";
import {changeSlide, selectActiveSlide, selectLastSlide} from "../sliderSlice";
import {resetRoute, selectRouteDetails} from "../../map/mapSlice";
import {selectRestaurants} from "../../restaurants/restaurantsSlice";
import {useSwipeable} from "react-swipeable";

const Slider = () => {

    const dispatch = useDispatch();

    const restaurants = useSelector(selectRestaurants);
    const {coordinates: routeCoordinates} = useSelector(selectRouteDetails);
    const activeSlide = useSelector(selectActiveSlide);
    const lastSlide = useSelector(selectLastSlide);

    const handleBackClick = () => dispatch(changeSlide("backward"));

    const handleNextClick = () => dispatch(changeSlide("forward"));

    const handleShowAllClick = () => dispatch(resetRoute());

    const backVisibility = {visibility: !restaurants || !restaurants.length || routeCoordinates ||
        activeSlide === 0 ? "hidden" : "visible"};

    const showAllVisibility = {visibility: !restaurants || !restaurants.length ||
        !routeCoordinates ? "hidden" : "visible"};

    const forwardVisibility = {visibility: !restaurants || !restaurants.length || routeCoordinates ||
        activeSlide === lastSlide ? "hidden" : "visible"};

    const handlers = useSwipeable({
        onSwipedLeft: () => dispatch(changeSlide("forward")),
        onSwipedRight: () => dispatch(changeSlide("backward")),
        // onSwiping: ({deltaX, dir}) => {
        //     setStyle((style) => {
        //         const updatedStyle = { ...style };
        //         const translateX = (dir === "Left" ? -deltaX : deltaX) / window.innerWidth;
        //         updatedStyle.transform = `translateX(${translateX * 100}%)`;
        //         return updatedStyle;
        //     });
        // },
        // onSwipeStart: ({ deltaX }) => setStartX(deltaX),
        preventScrollOnSwipe: true
    });

    return (
        <div className="slider" {...handlers}>
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