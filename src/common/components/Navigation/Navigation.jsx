import "./Navigation.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faMapLocationDot} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar/SearchBar";
import {useNavigate} from "react-router-dom";

const Navigation = ({view}) => {

    const navigate = useNavigate();

    const icon = view === "home" ? faMapLocationDot : faArrowLeft;

    const handleButtonClick = () => {
        const route = view === "home" ? "map" : "";
        navigate("/" + route);
    };

    return (
        <div className="navigation">
            <button className="button" onClick={handleButtonClick}>
                <FontAwesomeIcon className="icon" icon={icon}/>
            </button>

            <SearchBar/>
        </div>
    );
};

export default Navigation;