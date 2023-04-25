import "./LocationButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {selectLocationDescription, selectLocationOptionsOpen, toggleLocationOptions} from "../locationSlice";

const LocationButton = () => {

    const dispatch = useDispatch();

    const locationDescription = useSelector(selectLocationDescription);
    const optionsOpen = useSelector(selectLocationOptionsOpen);

    const handleClick = () => dispatch(toggleLocationOptions());

    return (
        <button className="location-button" onClick={handleClick}>
            <FontAwesomeIcon className="icon" icon={optionsOpen ? faXmark : faLocationDot}/>
            <span>{optionsOpen ? "Close options" : (locationDescription || "Newcastle Upon Tyne")}</span>
        </button>
    );
};

export default LocationButton;