import "./SearchBox.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import SearchFeedback from "./SearchFeedback/SearchFeedback";
import {useEffect, useRef, useState} from "react";
import InteractionButton from "../ButtonViews/InteractionButton/InteractionButton";

const SearchBox = ({handleInputChange, hasMatches = true, handleFocus, focused}) => {

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!focused) {
            setSearchQuery("");
        }
    }, [focused]);

    const handleChange = ({target}) => {
        const {value} = target;
        setSearchQuery(value);
        handleInputChange(value);
    };

    const handleClearClick = () => {
        setSearchQuery("");
        handleInputChange("");
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
                    onFocus={handleFocus}
                />

                {searchQuery && (
                    <InteractionButton icon={faCircleXmark} handleClick={handleClearClick}/>
                )}
            </div>

            {searchQuery && !hasMatches && <SearchFeedback/>}
        </div>
    );
};

export default SearchBox;