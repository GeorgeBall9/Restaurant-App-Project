/*
Description: Primary button component built off generic Button component for use throughout application
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// stylesheet
import "./InteractionButton.css";

// fontawesome import
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// InteractionButton component
const InteractionButton = ({icon, solidIcon, isSolid, handleClick, style}) => {
    return (
        <button className="interaction-button" onClick={handleClick}>
            {/* Conditionally render the FontAwesomeIcon based on the isSolid prop */}
            {isSolid ? (
                <FontAwesomeIcon icon={solidIcon} className="icon" style={style}/>
            ) : (
                <FontAwesomeIcon icon={icon} className="icon" style={style}/>
            )}
        </button>
    );
};

export default InteractionButton;