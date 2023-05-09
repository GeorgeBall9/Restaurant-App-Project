import "./CuisineOptions.css";
import CuisineButton from "./CuisineButton/CuisineButton";
import {useDispatch, useSelector} from "react-redux";
import {
    resetCuisineFilter,
    selectCuisineFilter,
    selectSortFilter,
    toggleFiltersDropdown,
    updateCuisineFilter
} from "../../../../../../features/filters/filtersSlice";
import {
    filterRestaurantResultsByCuisine,
    resetRestaurantResults,
    sortRestaurants
} from "../../../../../../features/restaurants/restaurantsSlice";
import {resetDisplayedRestaurant} from "../../../../../../features/map/mapSlice";

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
];

const CuisineOptions = () => {

    const dispatch = useDispatch();

    const cuisineFilter = useSelector(selectCuisineFilter);

    const handleCuisineOptionClick = (name) => {
        if (name === cuisineFilter) {
            dispatch(resetCuisineFilter());
        } else {
            dispatch(updateCuisineFilter(name));
        }
    };

    return (
        <div className="cuisine-options-container">
            {cuisineOptions.map((name, i) => (
                <CuisineButton
                    key={i}
                    name={name}
                    selected={cuisineFilter === name}
                    handleClick={handleCuisineOptionClick}
                />
            ))}
        </div>
    );
};

export default CuisineOptions;