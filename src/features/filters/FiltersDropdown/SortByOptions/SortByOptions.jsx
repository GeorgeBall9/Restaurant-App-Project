import "./SortByOptions.css";
import SortButton from "./SortButton/SortButton";
import {
    resetSortFilter,
    selectCuisineFilter,
    selectSortFilter,
    toggleFiltersDropdown,
    updateSortFilter
} from "../../filtersSlice";
import {
    filterRestaurantResultsByCuisine,
    resetRestaurantResults,
    sortRestaurants
} from "../../../restaurants/restaurantsSlice";
import {resetDisplayedRestaurant} from "../../../map/mapSlice";
import {useDispatch, useSelector} from "react-redux";

const sortByOptions = ["Distance", "Rating", "Price"];

const SortByOptions = () => {

    const dispatch = useDispatch();

    const sortByFilter = useSelector(selectSortFilter);
    const cuisineFilter = useSelector(selectCuisineFilter);

    const handleSortButtonClick = (name) => {
        if (name === sortByFilter) {
            dispatch(resetSortFilter());
            dispatch(resetRestaurantResults());
            dispatch(filterRestaurantResultsByCuisine(cuisineFilter))
        } else {
            dispatch(updateSortFilter(name));
            dispatch(sortRestaurants(name));
        }

        dispatch(resetDisplayedRestaurant());
        dispatch(toggleFiltersDropdown());
    };

    return (
        <div className="sort-buttons-container">
            {sortByOptions.map((name, i) => (
                <SortButton
                    key={i}
                    name={name}
                    selected={sortByFilter === name}
                    handleClick={handleSortButtonClick}
                />
            ))}
        </div>
    );
};

export default SortByOptions;