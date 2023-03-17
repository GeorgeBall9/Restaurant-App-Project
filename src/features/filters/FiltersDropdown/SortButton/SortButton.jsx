import "./SortButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPersonWalking, faStar, faSterlingSign} from "@fortawesome/free-solid-svg-icons";

const iconsMap = {
    Distance: faPersonWalking,
    Rating: faStar,
    Price: faSterlingSign
};

const SortButton = ({name, selected, handleClick}) => {

    const icon = iconsMap[name];

    return (
        <button className={`sort-button ${selected ? "selected" : ""}`} onClick={() => handleClick(name)}>
            <FontAwesomeIcon icon={icon} className="icon"/>
            {name}
        </button>
    );
};

export default SortButton;