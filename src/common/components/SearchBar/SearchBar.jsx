import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSliders} from "@fortawesome/free-solid-svg-icons";
import FiltersDropdown from "./FiltersDropdown/FiltersDropdown";

const SearchBar = () => {
    return (
        <div className="search-and-filters">
            <div className="search-bar">
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>

                <input type="text" className="search-input" placeholder="Search"/>

                <button className="filter-button">
                    <FontAwesomeIcon className="icon" icon={faSliders}/>
                </button>
            </div>

            <FiltersDropdown/>
        </div>
    );
};

export default SearchBar;