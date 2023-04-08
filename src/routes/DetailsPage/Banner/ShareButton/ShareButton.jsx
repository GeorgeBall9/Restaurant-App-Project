import "./ShareButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareFromSquare} from "@fortawesome/free-regular-svg-icons";

const ShareButton = ({id, style}) => {

    const handleClick = () => {
        console.log("sharing to social media");
    };

    return (
        <button className="share-button" onClick={handleClick}>
            <FontAwesomeIcon icon={faShareFromSquare} className="icon" style={style}/>
        </button>
    );
};

export default ShareButton;