import {useDispatch} from "react-redux";
import {sortReviews} from "../../../features/reviews/reviewsSlice";
import {sortFriendRequests, sortFriends} from "../../../features/user/userSlice";

const SortFilterButton = ({text, filter, multiplier, active, type = "reviews"}) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        if (type === "friends") {
            dispatch(sortFriends({text, filter, multiplier}));
        } else if (type === "requests") {
            dispatch(sortFriendRequests({text, filter, multiplier}));
        } else {
            dispatch(sortReviews({text, filter, multiplier}));
        }
    };

    return (
        <button onClick={handleClick} className={active ? "active" : ""}>
            {text}
        </button>
    );
};

export default SortFilterButton;