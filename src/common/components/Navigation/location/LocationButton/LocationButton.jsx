import "./LocationButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {selectLocationDescription} from "../../../../../features/location/locationSlice";

const LocationButton = ({handleClick, optionsOpen}) => {

    const locationDescription = useSelector(selectLocationDescription);

    return (
        <button className="location-button" onClick={handleClick}>
            <FontAwesomeIcon className="icon" icon={optionsOpen ? faXmark : faLocationDot}/>

            <span>{optionsOpen ? "Close options" : (locationDescription || "Newcastle Upon Tyne")}</span>
        </button>
    );
};

export default LocationButton;