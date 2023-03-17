import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurants} from "../../features/restaurants/restaurantsSlice";
import {setLastSlide} from "../../features/slider/sliderSlice";

const useInitialiseSlider = () => {

    const dispatch = useDispatch();

    const restaurants = useSelector(selectRestaurants);

    useEffect(() => {
        if (!restaurants) return;

        dispatch(setLastSlide(restaurants.length - 1));
    }, [restaurants]);
};

export default useInitialiseSlider;