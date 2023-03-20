import "./BookmarkButton.css";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const BookmarkButton = () => {
    return (
        <FontAwesomeIcon icon={faBookmark} className="icon"/>
    );
};

export default BookmarkButton;