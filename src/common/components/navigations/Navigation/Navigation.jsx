import "./Navigation.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faMapLocationDot,
    faSliders,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAppliedCuisineFilter, selectAppliedSortFilter} from "../../../../features/filters/filtersSlice";
import AppliedFilterButton from "./filters/AppliedFilterButton/AppliedFilterButton";
import LocationButton from "./location/LocationButton/LocationButton";
import LocationOptions from "./location/LocationOptions/LocationOptions";
import SearchBox from "../SearchBox/SearchBox";
import {
    filterResultsBySearchQuery,
    resetRestaurantResults,
    selectHasMatches
} from "../../../../features/restaurants/restaurantsSlice";
import {useEffect, useRef, useState} from "react";
import FiltersDropdown from "./filters/FiltersDropdown/FiltersDropdown";

const Navigation = ({view, setNavHeight}) => {

    const dispatch = useDispatch();

    const appliedSortFilter = useSelector(selectAppliedSortFilter);
    const appliedCuisineFilter = useSelector(selectAppliedCuisineFilter);
    const searchHasMatches = useSelector(selectHasMatches);

    const ref = useRef();

    const [locationOptionsAreVisible, setLocationOptionsAreVisible] = useState(false);
    const [filtersAreVisible, setFiltersAreVisible] = useState(false);
    const [searchIsFocused, setSearchIsFocused] = useState(false);

    const icon = view === "home" ? faMapLocationDot : faArrowLeft;

    useEffect(() => {
        if (!setNavHeight) return;

        setNavHeight(ref.current?.offsetHeight);
    }, [searchIsFocused]);

    const handleFocus = () => {
        setSearchIsFocused(true);
    };

    const handleCancelClick = () => {
        setSearchIsFocused(false);
        dispatch(resetRestaurantResults());
    };

    return (
        <div ref={ref} className="navigation-container">
            <div className="navigation">
                <div className="upper">
                    {!searchIsFocused && (
                        <Link to={view === "home" ? "/map" : "/"} className="button">
                            <FontAwesomeIcon className="icon" icon={icon}/>
                        </Link>
                    )}

                    <div className="search-and-filters">
                        <SearchBox
                            handleInputChange={(query) => dispatch(filterResultsBySearchQuery(query))}
                            hasMatches={searchHasMatches}
                            handleFocus={handleFocus}
                            focused={searchIsFocused}
                        />

                        {!searchIsFocused && (
                            <button
                                className="button filter-button"
                                onClick={() => setFiltersAreVisible(true)}
                            >
                                <FontAwesomeIcon className="icon" icon={faSliders}/>
                            </button>
                        )}

                        {searchIsFocused && (
                            <button className="cancel" onClick={handleCancelClick}>
                                Cancel
                            </button>
                        )}
                    </div>

                    {!searchIsFocused && (
                        <Link to="/profile" className="button">
                            <FontAwesomeIcon className="icon" icon={faUser}/>
                        </Link>
                    )}
                </div>

                {!searchIsFocused && (
                    <div className="lower">
                        <LocationButton
                            handleClick={() => setLocationOptionsAreVisible(locationOptionsAreVisible => !locationOptionsAreVisible)}
                            optionsOpen={locationOptionsAreVisible}
                        />

                        {appliedSortFilter && (
                            <AppliedFilterButton type="sortBy" filter={appliedSortFilter}/>
                        )}

                        {appliedCuisineFilter && (
                            <AppliedFilterButton type="cuisine" filter={appliedCuisineFilter}/>
                        )}
                    </div>
                )}
            </div>

            {!searchIsFocused && filtersAreVisible && (
                <FiltersDropdown closePopup={() => setFiltersAreVisible(false)}/>
            )}

            {!searchIsFocused && locationOptionsAreVisible && (
                <LocationOptions closePopup={() => setLocationOptionsAreVisible(false)}/>
            )}
        </div>
    );
};

export default Navigation;