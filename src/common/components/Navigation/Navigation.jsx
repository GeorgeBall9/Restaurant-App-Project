import "./Navigation.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faMapLocationDot,
    faSliders,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "./SearchBox/SearchBox";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAppliedCuisineFilter,
    selectAppliedSortFilter,
    showFilters,
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

    const handleProfileClick = () => {
        navigate("/edit-profile");
    };

    return (
        <div className="navigation-container">
            <div className="navigation">
                <div className="upper">
                    <button className="button" onClick={handleNavigateButtonClick}>
                        <FontAwesomeIcon className="icon" icon={icon}/>
                    </button>

                    <div className="search-and-filters">
                        <SearchBox/>

                        <button
                            className="button filter-button"
                            onClick={handleFilterButtonClicked}
                        >
                            <FontAwesomeIcon className="icon" icon={faSliders}/>
                        </button>
                    </div>

                    <button className="button" onClick={handleProfileClick}>
                        <FontAwesomeIcon className="icon" icon={faUser}/>
                    </button>
                </div>

                <div className="lower">
                    <LocationButton/>

                    {appliedSortFilter && (
                        <AppliedFilterButton filter={appliedSortFilter}/>
                    )}

                    {appliedCuisineFilter && (
                        <AppliedFilterButton filter={appliedCuisineFilter}/>
                    )}
                </div>
            </div>

            {locationOptionsOpen && <LocationOptions/>}
        </div>
    );
};

export default Navigation;
