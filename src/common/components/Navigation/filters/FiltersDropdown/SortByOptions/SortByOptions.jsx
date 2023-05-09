import "./SortByOptions.css";
import SortButton from "./SortButton/SortButton";
import {
    resetSortFilter,
    selectCuisineFilter,
    selectSortFilter,
    toggleFiltersDropdown,
    updateSortFilter
} from "../../../../../../features/filters/filtersSlice";
import {
    filterRestaurantResultsByCuisine,
    resetRestaurantResults,
    sortRestaurants
} from "../../../../../../features/restaurants/restaurantsSlice";
import {resetDisplayedRestaurant} from "../../../../../../features/map/mapSlice";
import {useDispatch, useSelector} from "react-redux";

const sortByOptions = ["Distance", "Rating", "Price"];

const SortByOptions = () => {

    const dispatch = useDispatch();

    const sortByFilter = useSelector(selectSortFilter);

    const handleSortButtonClick = (name) => {
        if (name === sortByFilter) {
            dispatch(resetSortFilter());
        } else {
            dispatch(updateSortFilter(name));
        }
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