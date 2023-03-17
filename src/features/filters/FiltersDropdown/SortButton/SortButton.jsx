import "./SortButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonWalking, faStar, faSterlingSign} from "@fortawesome/free-solid-svg-icons";

const iconsMap = {
    Distance: faPersonWalking,
    Rating: faStar,
    Price: faSterlingSign
};

const SortButton = ({name}) => {

    const icon = iconsMap[name];

    return (
        <button className="sort-button">
            <FontAwesomeIcon icon={icon} className="icon"/>
            {name}
        </button>
    );
};

export default SortButton;