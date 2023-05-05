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
import {
    selectAppliedCuisineFilter,
    selectAppliedSortFilter,
    showFilters,
} from "../../../features/filters/filtersSlice";
import AppliedFilterButton from "./AppliedFilterButton/AppliedFilterButton";
import LocationButton from "../../../features/location/LocationButton/LocationButton";
import LocationOptions from "../../../features/location/LocationButton/LocationOptions/LocationOptions";
import {selectLocationOptionsOpen} from "../../../features/location/locationSlice";
import SearchBoxView from "../SearchBoxView/SearchBoxView";
import {filterResultsBySearchQuery, selectHasMatches} from "../../../features/restaurants/restaurantsSlice";

const Navigation = ({view}) => {

    const dispatch = useDispatch();

    const appliedSortFilter = useSelector(selectAppliedSortFilter);
    const appliedCuisineFilter = useSelector(selectAppliedCuisineFilter);
    const locationOptionsOpen = useSelector(selectLocationOptionsOpen);
    const searchHasMatches = useSelector(selectHasMatches);

    const icon = view === "home" ? faMapLocationDot : faArrowLeft;

    const handleFilterButtonClicked = () => {
        dispatch(showFilters());
    };

    return (
        <div className="navigation-container">
            <div className="navigation">
                <div className="upper">
                    <Link to={view === "home" ? "/map" : "/"} className="button">
                        <FontAwesomeIcon className="icon" icon={icon}/>
                    </Link>

                    <div className="search-and-filters">
                        <SearchBoxView
                            handleInputChange={(query) => dispatch(filterResultsBySearchQuery(query))}
                            hasMatches={searchHasMatches}
                        />

                        <button
                            className="button filter-button"
                            onClick={handleFilterButtonClicked}
                        >
                            <FontAwesomeIcon className="icon" icon={faSliders}/>
                        </button>
                    </div>

                    <Link to="/profile" className="button">
                        <FontAwesomeIcon className="icon" icon={faUser}/>
                    </Link>
                </div>

                <div className="lower">
                    <LocationButton/>

                    {appliedSortFilter && (
                        <AppliedFilterButton type="sortBy" filter={appliedSortFilter}/>
                    )}

                    {appliedCuisineFilter && (
                        <AppliedFilterButton type="cuisine" filter={appliedCuisineFilter}/>
                    )}
                </div>
            </div>

            {locationOptionsOpen && <LocationOptions/>}
        </div>
    );
};

export default Navigation;
