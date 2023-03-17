import {useDispatch, useSelector} from "react-redux";
import {
    filterRestaurantResultsByCuisine,
    selectAllRestaurants,
    sortRestaurants
} from "../../features/restaurants/restaurantsSlice";
import {selectCuisineFilter, selectSortFilter} from "../../features/filters/filtersSlice";
import {useEffect} from "react";

const useFilterRestaurants = () => {
    const dispatch = useDispatch();

    const allRestaurants = useSelector(selectAllRestaurants);
    const sortByFilter = useSelector(selectSortFilter);
    const cuisineFilter = useSelector(selectCuisineFilter);

    useEffect(() => {
        if (!allRestaurants || !sortByFilter || !cuisineFilter) return;

        dispatch(sortRestaurants(sortByFilter));
        dispatch(filterRestaurantResultsByCuisine(cuisineFilter));
    }, [allRestaurants]);
};

export default useFilterRestaurants;