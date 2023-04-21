import "./RecommendButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faSolidHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addBookmark, removeBookmark, selectBookmarks, selectUserId} from "../../../../features/user/userSlice";
import {useEffect, useState} from "react";
import {addUserBookmark, removeUserBookmark} from "../../../../firebase/firebase";

const RecommendButton = ({restaurant, style}) => {

    // const id = restaurant?.id;
    //
    // const navigate = useNavigate();
    //
    // const dispatch = useDispatch();
    //
    // const userId = useSelector(selectUserId);
    //
    // const bookmarks = useSelector(selectBookmarks);
    //
    // const [isBookmarked, setIsBookmarked] = useState(false);
    //
    // useEffect(() => {
    //     if (!bookmarks || !id) return;
    //
    //     setIsBookmarked(bookmarks.some(bookmark => bookmark === id));
    // }, [bookmarks, id]);
    //
    // const handleBookmarkClick = async () => {
    //     if (!userId) {
    //         navigate("/sign-in");
    //     } else if (isBookmarked) {
    //         dispatch(removeBookmark(id));
    //         await removeUserBookmark(userId, id);
    //     } else {
    //         dispatch(addBookmark(id));
    //         await addUserBookmark(userId, restaurant);
    //     }
    // };

    return (
        <button>
            <FontAwesomeIcon icon={faHeart} className="icon" style={style}/>
        </button>
    );
};

export default RecommendButton;