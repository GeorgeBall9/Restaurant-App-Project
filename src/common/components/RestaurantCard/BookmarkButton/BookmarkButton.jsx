import "./BookmarkButton.css";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkSolid} from "@fortawesome/free-solid-svg-icons";
import {selectBookmarks, setBookmarks} from "../../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";

const BookmarkButton = ({id, style}) => {

    const dispatch = useDispatch();

    const bookmarks = useSelector(selectBookmarks);

    const isBookmarked = bookmarks.includes(id);

    const handleBookmarkClick = () => {
        let updatedBookmarks;

        if (isBookmarked) {
            updatedBookmarks = bookmarks.filter(bookmark => bookmark !== id);
        } else {
            updatedBookmarks = [...bookmarks, id];
        }

        dispatch(setBookmarks(updatedBookmarks));
    };

    return (
        <button className="bookmark-button" onClick={handleBookmarkClick}>
            {isBookmarked && (
                <FontAwesomeIcon icon={faBookmarkSolid} className="icon" style={style}/>
            )}

            {!isBookmarked && (
                <FontAwesomeIcon icon={faBookmark} className="icon" style={style}/>
            )}
        </button>
    );
};

export default BookmarkButton;