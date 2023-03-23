import "./LocationButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {toggleLocationOptions} from "../locationSlice";

const LocationButton = () => {

    const dispatch = useDispatch();

    const handleClick = () => dispatch(toggleLocationOptions());

    return (
        <button className="location-button" onClick={handleClick}>
            <FontAwesomeIcon className="icon" icon={faLocationDot}/>
            <span>Newcastle Upon Tyne</span>
        </button>
    );
};

export default LocationButton;