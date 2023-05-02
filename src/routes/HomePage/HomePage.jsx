import "./HomePage.css";
import Navigation from "../../common/components/Navigation/Navigation";
import RestaurantsList from "../../features/restaurants/RestaurantsList/RestaurantsList";
import NoResults from "../../common/components/NoResults/NoResults";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurants, selectRestaurantsFetchStatus, updateRestaurant } from "../../features/restaurants/restaurantsSlice";
import { getRestaurantById } from "../../firebase/firebase";
import { useEffect } from "react";
import { hideSpinner, showSpinner } from "../../features/spinner/spinnerSlice";

const HomePage = () => {

    const dispatch = useDispatch();
    const fetchStatus = useSelector(selectRestaurantsFetchStatus);
    const restaurants = useSelector(selectRestaurants);

    useEffect(() => {
        if (fetchStatus === "pending") {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [fetchStatus]);

    useEffect(() => {
        if (restaurants) {
            restaurants.forEach(async (restaurant) => {
                const restaurantData = await getRestaurantById(restaurant.id);
                if (restaurantData) {
                    dispatch(updateRestaurant(restaurantData));
                }
            });
        }
    }, [restaurants]);

    return (
        <div className="home container">
            <Navigation view="home" />

            <div className="restaurant-cards-container">
                <RestaurantsList />
                {restaurants && restaurants.length === 0 && <NoResults mainText="No restaurants found." subText="Why not try looking for something else?" />}
            </div>
        </div>
    );
};

export default HomePage;
