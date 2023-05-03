import "../SearchBoxView/SearchBoxView.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import SearchFeedback from "../SearchBoxView/SearchFeedback/SearchFeedback";
import {useDispatch, useSelector} from "react-redux";
import {selectSearchQuery, updateSearchQuery} from "../../../features/filters/filtersSlice";
import {filterResultsBySearchQuery, selectHasMatches} from "../../../features/restaurants/restaurantsSlice";

const SearchBox = ({type = "restaurant", matches}) => {

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

            {type === "restaurant" && (
                <SearchFeedback hasMatches={hasMatches} searchQuery={searchQuery}/>
            )}

            {(type === "reviews" || type === "friends" || type === "requests") && (
                <SearchFeedback hasMatches={matches} searchQuery={searchQuery}/>
            )}
        </div>
    );
};

export default SearchBox;