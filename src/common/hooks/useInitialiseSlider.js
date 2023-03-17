import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurants} from "../../features/restaurants/restaurantsSlice";
import {resetActiveSlide, setLastSlide} from "../../features/slider/sliderSlice";

const useInitialiseSlider = () => {

    const dispatch = useDispatch();

    const restaurants = useSelector(selectRestaurants);

    useEffect(() => {
        if (!restaurants) return;

        console.log("resetting slides")

        dispatch(resetActiveSlide());
        dispatch(setLastSlide(restaurants.length));
    }, [restaurants]);
};

export default useInitialiseSlider;