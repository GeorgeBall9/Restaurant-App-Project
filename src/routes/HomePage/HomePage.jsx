import "./HomePage.css";
import Navigation from "../../common/components/Navigation/Navigation";
import RestaurantsList from "../../features/restaurants/RestaurantsList/RestaurantsList";
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurantsFetchStatus} from "../../features/restaurants/restaurantsSlice";
import {useEffect} from "react";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";

const HomePage = () => {

    const dispatch = useDispatch();
    const fetchStatus = useSelector(selectRestaurantsFetchStatus);

    useEffect(() => {
        if (fetchStatus === "pending") {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [fetchStatus]);

    return (
        <div className="home container">
            <Navigation view="home"/>

            <div className="restaurant-cards-container">
                <RestaurantsList/>
            </div>
        </div>
    );
}

export default HomePage;
