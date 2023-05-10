import "./AppliedFilterButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {removedAppliedFilter, selectCuisineFilter, selectSortFilter} from "../../../../../../features/filters/filtersSlice";
import {
    filterRestaurantResultsByCuisine,
    resetRestaurantResults,
    sortRestaurants
} from "../../../../../../features/restaurants/restaurantsSlice";

const AppliedFilterButton = ({type, filter}) => {

    const dispatch = useDispatch();
    const sortFilter = useSelector(selectSortFilter);
    const cuisineFilter = useSelector(selectCuisineFilter);

    const handleCloseButtonClick = () => {
        dispatch(removedAppliedFilter(type));

        if (type === "sortBy") {
            dispatch(filterRestaurantResultsByCuisine(cuisineFilter));
        } else {
            dispatch(resetRestaurantResults());
            dispatch(sortRestaurants(sortFilter));
        }
    };

    return (
        <div className="filter-selected">
            <button className="close-button" onClick={handleCloseButtonClick}>
                <FontAwesomeIcon className="icon" icon={faXmark}/>
            </button>

            {filter}
        </div>
    );
};

export default AppliedFilterButton;