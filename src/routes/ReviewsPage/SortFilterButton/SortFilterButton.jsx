import {useDispatch} from "react-redux";
import {sortReviews} from "../../../features/reviews/reviewsSlice";

const SortFilterButton = ({text, filter, multiplier, active, clickHandler}) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        if (clickHandler) {
            clickHandler();
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