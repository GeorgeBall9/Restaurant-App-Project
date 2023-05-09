import "./InteractionButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const InteractionButton = ({icon, solidIcon, isSolid, handleClick, style}) => {
    return (
        <button className="interaction-button" onClick={handleClick}>
            {isSolid ? (
                <FontAwesomeIcon icon={solidIcon} className="icon" style={style}/>
            ) : (
                <FontAwesomeIcon icon={icon} className="icon" style={style}/>
            )}
        </button>
    );
};

export default InteractionButton;