import "./SearchBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faSliders} from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
    return (
        <div className="search-container">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            {/* <FontAwesomeIcon icon={faSliders}/> */}
            <input type="search" className="box" placeholder="Search" />
        </div>
    );
};

export default SearchBar;