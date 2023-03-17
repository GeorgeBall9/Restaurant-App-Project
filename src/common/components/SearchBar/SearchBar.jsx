import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSliders} from "@fortawesome/free-solid-svg-icons";
import FiltersDropdown from "../../../features/filters/FiltersDropdown/FiltersDropdown";

import {useDispatch, useSelector} from "react-redux";
import {selectDropdownFilterVisible, toggleFiltersDropdown} from "../../../features/filters/filtersSlice";
import {selectAllRestaurants} from "../../../features/restaurants/restaurantsSlice";
import { useState } from "react";

const SearchBar = () => {

    const dispatch = useDispatch();
    const dropdownVisible = useSelector(selectDropdownFilterVisible);

    const handleFilterButtonClicked = () => dispatch(toggleFiltersDropdown());

    // use this restaurants array inside the get search results function
    const restaurants = useSelector(selectAllRestaurants);

    const [searchQuery, setSearchQuery] = useState('');

    /*
    Function takes in the search query entered into the search bar and filters the list of restaurants
    Returns a new array (does not alter original restaurants array) that is filtered
    */
    const getSearchResults = (searchQuery) => {
        // Convert searchQuery to lowercase for case-insensitive comparison
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
    
        // Filter restaurants based on the searchQuery
        const searchResults = restaurants.filter((restaurant) => {
            const nameMatch = restaurant.name.toLowerCase().includes(lowerCaseSearchQuery);
    
            const cuisineMatch = restaurant.cuisines.some(cuisine => 
                cuisine.name.toLowerCase().includes(lowerCaseSearchQuery)
            );
                /* Ask for help on how to filter dietary requirements. Think need to be implemented in restaurant slice*/
    
            return nameMatch || cuisineMatch;
        });
    
        return searchResults;
    };


    // Not sure i need this
    // const handleInputChange = (event) => {
    //     const searchQuery = event.target.value;
    //     const searchResults = getSearchResults(searchQuery);
    //     console.log(searchResults); // log the search results for now
    // };

    return (
        <div className="search-and-filters">
            <div className="search-bar">
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>

                <input type="text" className="search-input" placeholder="Search" onChange={(event) => setSearchQuery(event.target.value)}/>

                <button className="filter-button" onClick={handleFilterButtonClicked}>
                    <FontAwesomeIcon className="icon" icon={faSliders}/>
                </button>
            </div>

            {/* **** FOR TESTING **** Display the search query on the screen */}
            <div>Current search query: {searchQuery}</div>

            {dropdownVisible && <FiltersDropdown/>}
        </div>
    );
};

export default SearchBar;