import {faBookmark} from "@fortawesome/free-regular-svg-icons";
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
import InteractionButton from "../InteractionButton/InteractionButton";
import InteractionFeedback from "../InteractionFeedback/InteractionFeedback";

const BookmarkButton = ({restaurant, style, updateInteractions}) => {

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

        if (feedbackIsVisible) return;

        if (isBookmarked) {
            dispatch(removeBookmark(id));
            await removeUserBookmark(userId, id);

            if (updateInteractions) {
                updateInteractions("bookmarks", -1);
            }
        } else {
            dispatch(addBookmark(id));
            await addUserBookmark(userId, restaurant);

            if (updateInteractions) {
                updateInteractions("bookmarks", 1);
            }
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

            <InteractionFeedback
                isVisible={feedbackIsVisible}
                change={isBookmarked ? "Saved to" : "Removed from"}
                interaction="bookmarks"
            />
        </>
    );
};

export default BookmarkButton;