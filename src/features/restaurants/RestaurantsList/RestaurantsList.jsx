import RestaurantCard from "../../../common/components/RestaurantCard/RestaurantCard";
import {useSelector} from "react-redux";
import {selectRestaurants} from "../restaurantsSlice";
import useFetchRestaurants from "../../../common/hooks/useFetchRestaurants";

const RestaurantsList = () => {

    const restaurants = useSelector(selectRestaurants);

    useFetchRestaurants();

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