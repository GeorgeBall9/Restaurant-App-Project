import "./CuisineOption.css";
import {faUtensils} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CuisineOption = () => {
    return (
        <div className="cuisine-option">
            <FontAwesomeIcon className="icon" icon={faUtensils}/>
            <p className="cuisine-option-name">British</p>
        </div>
    );
};

export default CuisineOption;