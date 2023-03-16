import RestaurantCard from "../../../common/components/RestaurantCard/RestaurantCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchRestaurants, selectRestaurants, selectRestaurantsFetchStatus} from "../restaurantsSlice";
import {useEffect} from "react";
import {selectCuisineFilter} from "../../filters/filtersSlice";

const RestaurantsList = () => {

    const restaurantsStatus = useSelector(selectRestaurantsFetchStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (restaurantsStatus !== "idle") return;

        dispatch(fetchRestaurants());
    });

    const restaurants = useSelector(selectRestaurants);

    return (
        <>
            {restaurants && restaurants.map(restaurant => (
                <RestaurantCard
                    key={restaurant.id}
                    {...restaurant}
                    openingHours={restaurant.hours[0]}
                    view="home"
                />
            ))}
        </>
    );
};

export default RestaurantsList;