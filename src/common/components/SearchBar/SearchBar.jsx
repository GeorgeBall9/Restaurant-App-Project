import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSliders} from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
    return (
        <div className="search-bar-container">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <FontAwesomeIcon icon={faSliders}/>
        </div>
    );
};

export default SearchBar;