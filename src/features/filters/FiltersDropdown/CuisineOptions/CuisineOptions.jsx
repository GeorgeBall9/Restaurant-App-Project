import "./CuisineOptions.css";
import CuisineButton from "./CuisineButton/CuisineButton";
import {useDispatch, useSelector} from "react-redux";
import {
    resetCuisineFilter,
    selectCuisineFilter,
    selectSortFilter,
    toggleFiltersDropdown,
    updateCuisineFilter
} from "../../filtersSlice";
import {
    filterRestaurantResultsByCuisine,
    resetRestaurantResults,
    sortRestaurants
} from "../../../restaurants/restaurantsSlice";
import {resetDisplayedRestaurant} from "../../../map/mapSlice";

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
    const sortByFilter = useSelector(selectSortFilter);

    const handleCuisineOptionClick = (name) => {
        if (name === cuisineFilter) {
            dispatch(resetCuisineFilter());
            dispatch(resetRestaurantResults());
        } else {
            dispatch(updateCuisineFilter(name));
            dispatch(filterRestaurantResultsByCuisine(name));
        }

        dispatch(sortRestaurants(sortByFilter));
        dispatch(resetDisplayedRestaurant());
        dispatch(toggleFiltersDropdown());
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