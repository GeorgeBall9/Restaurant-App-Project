import "./FiltersDropdown.css";
import CuisineOption from "./CuisineOption/CuisineOption";

import {useSelector, useDispatch} from "react-redux";
import {
    selectCuisineFilter,
    updateCuisineFilter,
    resetCuisineFilter,
    toggleFiltersDropdown,
    selectSortFilter, updateSortFilter, resetSortFilter
} from "../filtersSlice";
import {resetDisplayedRestaurant} from "../../map/mapSlice";
import {
    filterRestaurantResultsByCuisine,
    resetRestaurantResults, sortRestaurants
} from "../../restaurants/restaurantsSlice";
import SortButton from "./SortButton/SortButton";
import LocationOptions from "./LocationOptions/LocationOptions";

const cuisineOptions = [
    "Any",
    "British",
    "Chinese",
    "European",
    "Burger",
    "Indian",
    "Italian",
    "Japanese",
    "Mexican",
    "Pizza",
    "Pub",
    "Bar",
    "Spanish",
    "Steak",
    "Sushi",
    "Thai"
]

const FiltersDropdown = () => {

    const dispatch = useDispatch();

    const cuisineFilter = useSelector(selectCuisineFilter);

    const handleCuisineOptionClick = (name) => {
        if (name === cuisineFilter) {
            dispatch(resetCuisineFilter());
            dispatch(resetRestaurantResults());
        } else {
            dispatch(updateCuisineFilter(name));
            dispatch(filterRestaurantResultsByCuisine(name));
        }

        dispatch(resetDisplayedRestaurant());
        dispatch(toggleFiltersDropdown());
    };

    const sortByOptions = ["Distance", "Rating", "Price"];

    const sortByFilter = useSelector(selectSortFilter);

    const handleSortButtonClick = (name) => {
        if (name === sortByFilter) {
            dispatch(resetSortFilter());
            dispatch(resetRestaurantResults());
        } else {
            dispatch(updateSortFilter(name));
            dispatch(sortRestaurants(name));
        }

        dispatch(resetDisplayedRestaurant());
        dispatch(toggleFiltersDropdown());
    };

    return (
        <div className="filters-dropdown">
            <div className="sort-options-container">
                <h3>Sort by</h3>

                <div className="buttons-container">
                    {sortByOptions.map((name, i) => (
                        <SortButton
                            key={i}
                            name={name}
                            selected={sortByFilter === name}
                            handleClick={handleSortButtonClick}
                        />
                    ))}
                </div>
            </div>

            <div className="location-filters">
                <h3>Location</h3>

                <LocationOptions/>
            </div>

            <div className="cuisine-filters">
                <h3>Cuisine</h3>

                <div className="cuisine-options-container">
                    {cuisineOptions.map((name, i) => (
                        <CuisineOption
                            key={i}
                            name={name}
                            selected={cuisineFilter === name}
                            handleClick={handleCuisineOptionClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FiltersDropdown;