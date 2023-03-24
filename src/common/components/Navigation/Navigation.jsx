import "./Navigation.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faLocationDot,
    faMapLocationDot,
    faSliders,
    faUser,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "./SearchBox/SearchBox";
import {useNavigate} from "react-router-dom";
import FiltersDropdown from "../../../features/filters/FiltersDropdown/FiltersDropdown";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAppliedCuisineFilter,
    selectAppliedSortFilter,
    selectDropdownFilterVisible, selectFiltersAreVisible, showFilters,
    toggleFiltersDropdown
} from "../../../features/filters/filtersSlice";
import AppliedFilterButton from "./AppliedFilterButton/AppliedFilterButton";
import LocationButton from "../../../features/location/LocationButton/LocationButton";
import LocationOptions from "../../../features/location/LocationOptions/LocationOptions";
import {selectLocationOptionsOpen} from "../../../features/location/locationSlice";

const Navigation = ({view}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const appliedSortFilter = useSelector(selectAppliedSortFilter);
    const appliedCuisineFilter = useSelector(selectAppliedCuisineFilter);
    const locationOptionsOpen = useSelector(selectLocationOptionsOpen);

    const icon = view === "home" ? faMapLocationDot : faArrowLeft;

    const handleNavigateButtonClick = () => {
        const route = view === "home" ? "map" : "";
        navigate("/" + route);
    };

    const handleFilterButtonClicked = () => dispatch(showFilters());

    return (
        <div className="navigation-container">
            <div className="navigation">
                <div className="upper">
                    <button className="button" onClick={handleNavigateButtonClick}>
                        <FontAwesomeIcon className="icon" icon={icon}/>
                    </button>

                    <div className="search-and-filters">
                        <SearchBox/>

                        <button className="button filter-button" onClick={handleFilterButtonClicked}>
                            <FontAwesomeIcon className="icon" icon={faSliders}/>
                        </button>
                    </div>

                    <button className="button">
                        <FontAwesomeIcon className="icon" icon={faUser}/>
                    </button>
                </div>

                <div className="lower">
                    <LocationButton/>

                    {appliedSortFilter && <AppliedFilterButton type={"sortBy"} filter={appliedSortFilter}/>}

                    {appliedCuisineFilter && <AppliedFilterButton type={"cuisine"} filter={appliedCuisineFilter}/>}
                </div>
            </div>

            {locationOptionsOpen && <LocationOptions/>}
        </div>
    );
};

export default Navigation;