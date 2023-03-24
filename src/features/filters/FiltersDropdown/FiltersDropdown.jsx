import "./FiltersDropdown.css";
import LocationOptions from "../../location/LocationOptions/LocationOptions";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faBan} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

const FiltersDropdown = () => {

    const dispatch = useDispatch();

    const sortFilter = useSelector(selectSortFilter);
    const cuisineFilter = useSelector(selectCuisineFilter);

    const handleApplyClick = () => {
        dispatch(filterRestaurantResultsByCuisine(cuisineFilter));
        dispatch(sortRestaurants(sortFilter));
        dispatch(applyFilters());
    };

    const handleResetClick = () => {
        dispatch(resetFilters());
        dispatch(resetRestaurantResults());
    };

    const [filtersAppliedCount, setFiltersAppliedCount] = useState(0);

    useEffect(() => {
        let count = 0;

        if (sortFilter) count++;

        if (cuisineFilter !== "Any") count++;

        setFiltersAppliedCount(count);

    }, [sortFilter, cuisineFilter]);

    return (
        <div className="filters-dropdown-container">
            <div className="filters-dropdown">
                <div className="action-buttons-container">
                    <button onClick={handleResetClick}>
                        <FontAwesomeIcon icon={faArrowLeft} className="icon"/>
                        Back
                    </button>

                    <button onClick={handleResetClick}>
                        <FontAwesomeIcon icon={faBan} className="icon"/>
                        Reset
                    </button>
                </div>

                <div className="sort-options-container">
                    <h3>Sort by</h3>

                    <SortByOptions/>
                </div>

                <div className="cuisine-filters">
                    <h3>Cuisine</h3>

                    <CuisineOptions/>
                </div>

                <button className="apply-button" onClick={handleApplyClick}>
                    Apply
                    {filtersAppliedCount > 0 && (
                        <span className="filters-applied-count">({filtersAppliedCount})</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default FiltersDropdown;