import "./FiltersDropdown.css";
import SortByOptions from "./SortByOptions/SortByOptions";
import CuisineOptions from "./CuisineOptions/CuisineOptions";
import {useDispatch, useSelector} from "react-redux";
import {
    applyFilters, resetFilters,
    selectCuisineFilter,
    selectSortFilter,
} from "../../../../../features/filters/filtersSlice";
import {
    filterRestaurantResultsByCuisine,
    resetRestaurantResults,
    sortRestaurants
} from "../../../../../features/restaurants/restaurantsSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faBan} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import PrimaryButton from "../../../buttonViews/PrimaryButton/PrimaryButton";
import Overlay from "../../../Overlay/Overlay";

const FiltersDropdown = ({closePopup}) => {

    const dispatch = useDispatch();

    const sortFilter = useSelector(selectSortFilter);
    const cuisineFilter = useSelector(selectCuisineFilter);

    const handleApplyClick = () => {
        dispatch(filterRestaurantResultsByCuisine(cuisineFilter));
        dispatch(sortRestaurants(sortFilter));
        dispatch(applyFilters());
        closePopup();
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
        <>
            <div className="filters-dropdown-container container">
                <div className="filters-dropdown">
                    <div className="filters-header">
                        <div className="action-buttons-container container">
                            <button onClick={() => closePopup()}>
                                <FontAwesomeIcon icon={faArrowLeft} className="icon"/>
                                Back
                            </button>

                            <h2>Filters</h2>

                            <button onClick={handleResetClick}>
                                <FontAwesomeIcon icon={faBan} className="ban-icon"/>
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="filters container">
                        <div className="sort-options-container">
                            <h3>Sort by</h3>

                            <SortByOptions/>
                        </div>

                        <div className="cuisine-filters">
                            <h3>Cuisine</h3>

                            <CuisineOptions/>
                        </div>

                        <PrimaryButton
                            text="Apply"
                            handleClick={handleApplyClick}
                            children={filtersAppliedCount > 0 && (
                                <span className="filters-applied-count">({filtersAppliedCount})</span>
                            )}
                        />
                    </div>
                </div>
            </div>

            <Overlay/>
        </>
    );
};

export default FiltersDropdown;