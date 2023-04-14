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

const BookmarkButton = ({restaurant, style}) => {

    const id = restaurant?.id;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const bookmarks = useSelector(selectBookmarks);

    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (!bookmarks || !id) return;

        setIsBookmarked(bookmarks.some(bookmark => bookmark === id));
    }, [bookmarks, id]);

    const handleBookmarkClick = async () => {
        if (!userId) {
            navigate("/sign-in");
        } else if (isBookmarked) {
            dispatch(removeBookmark(id));
            await removeUserBookmark(userId, id);
        } else {
            dispatch(addBookmark(id));
            await addUserBookmark(userId, restaurant);
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