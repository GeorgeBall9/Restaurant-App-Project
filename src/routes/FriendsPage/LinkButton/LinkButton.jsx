import "./LinkButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LinkButton = ({handleClick, text, icon}) => {
    return (
        <button className="link-button" onClick={handleClick}>
            {text}
            <FontAwesomeIcon className="icon" icon={icon}/>
        </button>
    );
};

export default LinkButton;