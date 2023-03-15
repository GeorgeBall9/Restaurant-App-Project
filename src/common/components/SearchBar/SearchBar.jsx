import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSliders} from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
    return (
        <div className="search-bar">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>
            <input type="text" className="search-input" placeholder="Search"/>
            <FontAwesomeIcon className="icon" icon={faSliders}/>
        </div>
    );
};

export default SearchBar;