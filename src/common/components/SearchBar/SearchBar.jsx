import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSliders} from "@fortawesome/free-solid-svg-icons";
import FiltersDropdown from "../../../features/filters/FiltersDropdown/FiltersDropdown";

import {useDispatch, useSelector} from "react-redux";
import {selectDropdownFilterVisible, toggleFiltersDropdown} from "../../../features/filters/filtersSlice";
import {selectAllRestaurants} from "../../../features/restaurants/restaurantsSlice";

const SearchBar = () => {

    const dispatch = useDispatch();
    const dropdownVisible = useSelector(selectDropdownFilterVisible);

    const handleFilterButtonClicked = () => dispatch(toggleFiltersDropdown());

    // use this restaurants array inside the get search results function
    const restaurants = useSelector(selectAllRestaurants);

    /*
    Function takes in the search query entered into the search bar and filters the list of restaurants
    Returns a new array (does not alter original restaurants array) that is filtered
    */
    const getSearchResults = (searchQuery) => {};

    return (
        <div className="search-and-filters">
            <div className="search-bar">
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>

                <input type="text" className="search-input" placeholder="Search"/>

                <button className="filter-button" onClick={handleFilterButtonClicked}>
                    <FontAwesomeIcon className="icon" icon={faSliders}/>
                </button>
            </div>

            {dropdownVisible && <FiltersDropdown/>}
        </div>
    );
};

export default SearchBar;