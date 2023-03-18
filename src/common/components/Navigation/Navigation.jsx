import "./Navigation.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faChevronLeft, faMapLocationDot} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../SearchBar/SearchBar";

const Navigation = ({handleButtonClick, view}) => {

    const icon = view === "home" ? faMapLocationDot : faArrowLeft;

    return (
        <div className="navigation-container">
            <button className="button" onClick={handleButtonClick}>
                <FontAwesomeIcon className="icon" icon={icon}/>
            </button>

            <SearchBar/>
        </div>
    );
};

export default Navigation;