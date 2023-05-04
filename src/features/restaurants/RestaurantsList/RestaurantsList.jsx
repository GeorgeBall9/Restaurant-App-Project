import {useSelector} from "react-redux";
import {selectRestaurants} from "../restaurantsSlice";
import MapRestaurantCard from "../../slider/Slider/MapRestaurantCard/MapRestaurantCard";

const RestaurantsList = ({view}) => {

    const restaurants = useSelector(selectRestaurants);

    return (
        <>
            {restaurants && restaurants.map((restaurant, i) => (
                <MapRestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    index={i}
                />
            ))}
        </>
    );
};

export default RestaurantsList;