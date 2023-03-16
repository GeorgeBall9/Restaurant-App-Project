import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSliders} from "@fortawesome/free-solid-svg-icons";
import FiltersDropdown from "./FiltersDropdown/FiltersDropdown";
import {useState} from "react";

const SearchBar = () => {

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleFilterButtonClicked = () => setDropdownVisible(dropdownVisible => !dropdownVisible);

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