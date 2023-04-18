import "./LocationButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {selectLocationDescription, toggleLocationOptions} from "../locationSlice";

const LocationButton = () => {

    const dispatch = useDispatch();

    const locationDescription = useSelector(selectLocationDescription);

    const handleClick = () => dispatch(toggleLocationOptions());

    return (
        <button className="location-button" onClick={handleClick}>
            <FontAwesomeIcon className="icon" icon={faLocationDot}/>
            <span>{locationDescription || "Newcastle Upon Tyne"}</span>
        </button>
    );
};

export default LocationButton;