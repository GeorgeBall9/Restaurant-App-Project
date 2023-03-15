import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSliders } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
    return (
        <div className="search-container">
            <div className="outerbox">
                <FontAwesomeIcon className="magnifycon" icon={faMagnifyingGlass} />
                <input type="text" className="box" placeholder="Search" />
                <FontAwesomeIcon className="filtercon" icon={faSliders} />
            </div>
        </div>
    );
};

export default SearchBar;