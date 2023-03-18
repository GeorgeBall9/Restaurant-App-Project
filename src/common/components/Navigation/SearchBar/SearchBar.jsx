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

import React, { useState, useEffect } from "react";
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

    // Add a state for the visibility of the no-matches-container
    const [noMatchesVisible, setNoMatchesVisible] = useState(false);

    // Use the useEffect hook to handle the fadeout effect
    useEffect(() => {
        if (!hasMatches && searchQuery.length > 0 && !noMatchesVisible) {
            setNoMatchesVisible(true);

            const timeout = setTimeout(() => {
                setNoMatchesVisible(false);
            }, 4000); // The fadeout duration can be adjusted

            return () => clearTimeout(timeout);
        }
    }, [hasMatches, searchQuery, noMatchesVisible]);

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

                {searchQuery.length > 0 && !hasMatches && (
                <div className={`no-matches-container ${noMatchesVisible ? "" : "fade-out"}`}>
                    <p className="no-matches-message">Oops! We didn't find a match</p>
                    <p className="try-something-else-message">
                        Why not try searching for something else?
                    </p>
                </div>
            )}
            </div>

            

            {dropdownVisible && <FiltersDropdown/>}
        </div>
    );
};

export default SearchBar;