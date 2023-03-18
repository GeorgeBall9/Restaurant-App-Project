import "./FiltersDropdown.css";
import LocationOptions from "./LocationOptions/LocationOptions";
import SortByOptions from "./SortByOptions/SortByOptions";
import CuisineOptions from "./CuisineOptions/CuisineOptions";

const FiltersDropdown = () => {

    return (
        <div className="filters-dropdown">
            <div className="sort-options-container">
                <h3>Sort by</h3>

                <SortByOptions/>
            </div>

            <div className="location-filters">
                <h3>Location</h3>

                <LocationOptions/>
            </div>

            <div className="cuisine-filters">
                <h3>Cuisine</h3>

                <CuisineOptions/>
            </div>
        </div>
    );
};

export default FiltersDropdown;