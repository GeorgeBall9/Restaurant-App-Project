import "./FiltersDropdown.css";
import LocationOptions from "../../../common/components/Navigation/LocationOptions/LocationOptions";
import SortByOptions from "./SortByOptions/SortByOptions";
import CuisineOptions from "./CuisineOptions/CuisineOptions";
import {useDispatch, useSelector} from "react-redux";
import {
    applyFilters, resetFilters,
    selectCuisineFilter,
    selectSortFilter,
    toggleFiltersDropdown
} from "../filtersSlice";
import {
    filterRestaurantResultsByCuisine,
    resetRestaurantResults,
    sortRestaurants
} from "../../restaurants/restaurantsSlice";

const FiltersDropdown = () => {

    const dispatch = useDispatch();

    const sortFilter = useSelector(selectSortFilter);
    const cuisineFilter = useSelector(selectCuisineFilter);

    const handleApplyClick = () => {
        dispatch(filterRestaurantResultsByCuisine(cuisineFilter));
        dispatch(sortRestaurants(sortFilter));
        dispatch(toggleFiltersDropdown());
        dispatch(applyFilters());
    };

    const handleResetClick = () => {
        dispatch(resetFilters());
        dispatch(resetRestaurantResults());
        dispatch(toggleFiltersDropdown());
    };

    return (
        <div className="filters-dropdown">
            <div className="sort-options-container">
                <h3>Sort by</h3>

                <SortByOptions/>
            </div>

            <div className="cuisine-filters">
                <h3>Cuisine</h3>

                <CuisineOptions/>
            </div>

            <div className="action-buttons-container">
                <button onClick={handleApplyClick}>Apply</button>
                <button onClick={handleResetClick}>Reset</button>
            </div>
        </div>
    );
};

export default FiltersDropdown;