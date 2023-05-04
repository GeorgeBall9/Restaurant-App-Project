import "./BookmarkButton.css";
import {faBookmark, faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as faBookmarkSolid, faXmark} from "@fortawesome/free-solid-svg-icons";
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
import InteractionButton from "../InteractionButton/InteractionButton";

const BookmarkButton = ({restaurant, style}) => {

    const id = restaurant?.id;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const bookmarks = useSelector(selectBookmarks);

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [feedbackIsVisible, setFeedbackIsVisible] = useState(false);

    useEffect(() => {
        if (!bookmarks || !id) return;

        setIsBookmarked(bookmarks.some(bookmark => bookmark === id));
    }, [bookmarks, id]);

    const handleBookmarkClick = async () => {
        if (!userId) {
            navigate("/sign-in");
            return;
        }

        if (isBookmarked) {
            dispatch(removeBookmark(id));
            await removeUserBookmark(userId, id);
        } else {
            dispatch(addBookmark(id));
            await addUserBookmark(userId, restaurant);
        }

        setFeedbackIsVisible(true);
        setTimeout(() => setFeedbackIsVisible(false), 2000);
    };

    return (
        <>
            <InteractionButton
                icon={faBookmark}
                solidIcon={faBookmarkSolid}
                isSolid={isBookmarked}
                handleClick={handleBookmarkClick}
                style={style}
            />

            <div className="bookmark-feedback" style={{opacity: feedbackIsVisible ? 1 : 0}}>
                {isBookmarked ? "Saved to" : "Removed from"} bookmarks
                <FontAwesomeIcon icon={isBookmarked ? faCircleCheck : faXmark} className="bookmark-feedback-icon"/>
            </div>
        </>
    );
};

export default BookmarkButton;