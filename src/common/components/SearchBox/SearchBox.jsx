import "./SearchBox.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import SearchFeedback from "./SearchFeedback/SearchFeedback";
import {useEffect, useRef, useState} from "react";

const SearchBox = ({handleInputChange, hasMatches = true, handleFocus, focused}) => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = ({target}) => {
        const {value} = target;
        setSearchQuery(value);
        handleInputChange(value);
    };

    useEffect(() => {
        if (!focused) {
            setSearchQuery("");
        }
    }, [focused]);

    return (
        <div className="search-box">
            <div className="input-container">
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>
                <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    onChange={handleChange}
                    value={searchQuery}
                    onFocus={handleFocus}
                />
            </div>

            {searchQuery && !hasMatches && <SearchFeedback/>}
        </div>
    );
};

export default SearchBox;