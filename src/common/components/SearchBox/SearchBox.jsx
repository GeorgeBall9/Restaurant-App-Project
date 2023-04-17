import "./SearchBox.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import SearchFeedback from "./SearchFeedback/SearchFeedback";
import {useDispatch, useSelector} from "react-redux";
import {selectSearchQuery, updateSearchQuery} from "../../../features/filters/filtersSlice";
import {filterResultsBySearchQuery, selectHasMatches} from "../../../features/restaurants/restaurantsSlice";

const SearchBox = ({type = "restaurant"}) => {

    const dispatch = useDispatch();

    const hasMatches = useSelector(selectHasMatches);

    const searchQuery = useSelector(selectSearchQuery);

    const handleInputChange = ({target}) => {
        const {value} = target;

        dispatch(updateSearchQuery(value));

        if (type === "restaurant") {
            dispatch(filterResultsBySearchQuery(value));
        }
    };

    return (
        <div className="search-box">
            <div className="input-container">
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    onChange={handleInputChange}
                    value={searchQuery + ""}
                />
            </div>

            <SearchFeedback hasMatches={hasMatches} searchQuery={searchQuery}/>
        </div>
    );
};

export default SearchBox;