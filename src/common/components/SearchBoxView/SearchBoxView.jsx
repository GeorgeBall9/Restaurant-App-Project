import "./SearchBoxView.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import SearchFeedback from "./SearchFeedback/SearchFeedback";
import {useState} from "react";

const SearchBoxView = ({handleInputChange, hasMatches = true}) => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = ({target}) => {
        const {value} = target;
        setSearchQuery(value);
        handleInputChange(value);
    };

    return (
        <div className="search-box">
            <div className="input-container">
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    onChange={handleChange}
                    value={searchQuery}
                />
            </div>

            {searchQuery && !hasMatches && <SearchFeedback/>}
        </div>
    );
};

export default SearchBoxView;