import {useDispatch, useSelector} from "react-redux";
import {
    fetchRestaurants,
    selectLastPositionQueried,
    selectRestaurantsFetchStatus
} from "../../features/restaurants/restaurantsSlice";
import {resetDisplayedRestaurant, selectUserPosition} from "../../features/map/mapSlice";
import {useEffect} from "react";

const useFetchRestaurants = () => {
    const dispatch = useDispatch();

    const restaurantsStatus = useSelector(selectRestaurantsFetchStatus);
    const userPosition = useSelector(selectUserPosition);
    const lastPositionQueried = useSelector(selectLastPositionQueried);

    useEffect(() => {
        if (restaurantsStatus !== "idle" || !userPosition
            || positionsAreEqual(userPosition, lastPositionQueried)) return;

        dispatch(resetDisplayedRestaurant());
        dispatch(fetchRestaurants(userPosition));
    }, [userPosition]);

    const positionsAreEqual = (position1, position2) => {
        const {longitude: lon1, latitude: lat1} = position1;
        const {longitude: lon2, latitude: lat2} = position2;

        return Math.abs(lon1 - lon2) < 0.001 && Math.abs(lat1 - lat2) < 0.001;
    }
};

export default useFetchRestaurants;