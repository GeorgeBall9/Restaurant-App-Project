import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSliders} from "@fortawesome/free-solid-svg-icons";
import FiltersDropdown from "../../../../features/filters/FiltersDropdown/FiltersDropdown";

import {useDispatch, useSelector} from "react-redux";
import {
    selectDropdownFilterVisible,
    selectSearchQuery,
    toggleFiltersDropdown,
    updateSearchQuery
} from "../../../../features/filters/filtersSlice";
import {filterResultsBySearchQuery} from "../../../../features/restaurants/restaurantsSlice";
import { selectRestaurants } from "../../../../features/restaurants/restaurantsSlice";

const SearchBar = () => {

    const dispatch = useDispatch();
    const dropdownVisible = useSelector(selectDropdownFilterVisible);

    const handleFilterButtonClicked = () => dispatch(toggleFiltersDropdown());

    const restaurantResults = useSelector(selectRestaurants);

    const searchQuery = useSelector(selectSearchQuery);

    const handleInputChange = ({target}) => {
        dispatch(updateSearchQuery(target.value));
        dispatch(filterResultsBySearchQuery(target.value));
    };

    return (
        <div className="search-and-filters">
            <div className="search-bar">
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    onChange={handleInputChange}
                    value={searchQuery + ""}
                />

                <button className="filter-button" onClick={handleFilterButtonClicked}>
                    <FontAwesomeIcon className="icon" icon={faSliders}/>
                </button>
            </div>

            {dropdownVisible && <FiltersDropdown/>}

            {searchQuery.length > 0 && restaurantResults.length === 0 && (
                <div className="no-matches-container">
                    <p className="no-matches-message">Oops! We didn't find a match</p>
                    <p className="try-something-else-message">
                        Why not try searching for something else?
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;