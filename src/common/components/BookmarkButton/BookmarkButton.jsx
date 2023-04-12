import "./BookmarkButton.css";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkSolid} from "@fortawesome/free-solid-svg-icons";
import {
    addBookmark,
    removeBookmark,
    selectBookmarks,
    selectUserId,
} from "../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {addUserBookmark, removeUserBookmark} from "../../../firebase/firebase";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const BookmarkButton = ({restaurantId, style}) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const bookmarks = useSelector(selectBookmarks);

    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (!bookmarks || !restaurantId) return;

        setIsBookmarked(bookmarks.some(bookmark => bookmark === restaurantId));
    }, [bookmarks, restaurantId]);

    const handleBookmarkClick = async () => {
        if (!userId) {
            navigate("/sign-in");
        } else if (isBookmarked) {
            dispatch(removeBookmark(restaurantId));
            await removeUserBookmark(userId, restaurantId);
        } else {
            dispatch(addBookmark(restaurantId));
            await addUserBookmark(userId, restaurantId);
        }
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