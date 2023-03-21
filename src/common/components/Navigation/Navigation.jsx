import "./Navigation.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faMapLocationDot, faSliders, faUser} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "./SearchBox/SearchBox";
import {useNavigate} from "react-router-dom";
import FiltersDropdown from "../../../features/filters/FiltersDropdown/FiltersDropdown";
import {useDispatch, useSelector} from "react-redux";
import {selectDropdownFilterVisible, toggleFiltersDropdown} from "../../../features/filters/filtersSlice";

const Navigation = ({view}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dropdownVisible = useSelector(selectDropdownFilterVisible);

    const icon = view === "home" ? faMapLocationDot : faArrowLeft;

    const handleNavigateButtonClick = () => {
        const route = view === "home" ? "map" : "";
        navigate("/" + route);
    };

    const handleFilterButtonClicked = () => dispatch(toggleFiltersDropdown());

    return (
        <div className="navigation container">
            <button className="button" onClick={handleNavigateButtonClick}>
                <FontAwesomeIcon className="icon" icon={icon}/>
            </button>

            <div className="search-and-filters">
                <SearchBox/>

                <button className="button filter-button" onClick={handleFilterButtonClicked}>
                    <FontAwesomeIcon className="icon" icon={faSliders}/>
                </button>

                {dropdownVisible && <FiltersDropdown/>}
            </div>

            <button className="button">
                <FontAwesomeIcon className="icon" icon={faUser}/>
            </button>


        </div>
    );
};

export default Navigation;