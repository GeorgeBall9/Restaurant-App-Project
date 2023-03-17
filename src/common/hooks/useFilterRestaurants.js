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
    const cuisineFilter = useSelector(selectCuisineFilter);
    const sortByFilter = useSelector(selectSortFilter);

    useEffect(() => {
        if (!allRestaurants || !cuisineFilter || !sortByFilter) return;

        dispatch(filterRestaurantResultsByCuisine(cuisineFilter));
        dispatch(sortRestaurants(sortByFilter));
    }, [allRestaurants]);
};

export default useFilterRestaurants;