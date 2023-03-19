import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSliders} from "@fortawesome/free-solid-svg-icons";
import FiltersDropdown from "../../../../features/filters/FiltersDropdown/FiltersDropdown";
import SearchFeedback from "./SearchFeedback/SearchFeedback";
import {useDispatch, useSelector} from "react-redux";
import {
    selectDropdownFilterVisible,
    selectSearchQuery,
    toggleFiltersDropdown,
    updateSearchQuery
} from "../../../../features/filters/filtersSlice";
import {filterResultsBySearchQuery, selectHasMatches} from "../../../../features/restaurants/restaurantsSlice";

const SearchBar = () => {

    const dispatch = useDispatch();
    const dropdownVisible = useSelector(selectDropdownFilterVisible);

    const handleFilterButtonClicked = () => dispatch(toggleFiltersDropdown());

    const hasMatches = useSelector(selectHasMatches);

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

                <SearchFeedback hasMatches={hasMatches} searchQuery={searchQuery}/>
            </div>

            {dropdownVisible && <FiltersDropdown/>}
        </div>
    );
};

export default SearchBar;