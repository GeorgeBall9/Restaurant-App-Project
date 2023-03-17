import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurants} from "../../features/restaurants/restaurantsSlice";
import {setActiveSlide, setLastSlide} from "../../features/slider/sliderSlice";
import {displayRestaurant} from "../../features/map/mapSlice";

const useInitialiseSlider = () => {

    const dispatch = useDispatch();

    const restaurants = useSelector(selectRestaurants);

    useEffect(() => {
        if (!restaurants) return;

        dispatch(displayRestaurant(restaurants[0]));
        dispatch(setActiveSlide(0));
        dispatch(setLastSlide(restaurants.length));
    }, [restaurants]);
};

export default useInitialiseSlider;