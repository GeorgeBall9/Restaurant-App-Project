import "./BookmarkButton.css";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkSolid} from "@fortawesome/free-solid-svg-icons";
import {selectBookmarks, selectUserId, setBookmarks} from "../../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {addUserBookmark, removeUserBookmark} from "../../../../firebase/firebase";

const BookmarkButton = ({id, style}) => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const bookmarks = useSelector(selectBookmarks);

    const isBookmarked = bookmarks.includes(id);

    const handleBookmarkClick = async () => {
        let updatedBookmarks;

        if (isBookmarked) {
            updatedBookmarks = bookmarks.filter(bookmark => bookmark !== id);
            await removeUserBookmark(userId, id);
        } else {
            updatedBookmarks = [...bookmarks, id];
            await addUserBookmark(userId, id);
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