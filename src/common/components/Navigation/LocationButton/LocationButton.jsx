import "./LocationButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";

const LocationButton = () => {
    return (
        <button className="location-button">
            <FontAwesomeIcon className="icon" icon={faLocationDot}/>
            <span>Newcastle Upon Tyne</span>
        </button>
    );
};

export default LocationButton;