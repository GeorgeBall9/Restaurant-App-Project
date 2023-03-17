import RestaurantCard from "../../../common/components/RestaurantCard/RestaurantCard";
import {useSelector} from "react-redux";
import {selectRestaurants} from "../restaurantsSlice";

const RestaurantsList = ({view}) => {

    const restaurants = useSelector(selectRestaurants);

    return (
        <>
            {restaurants && restaurants.map((restaurant, i) => (
                <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    openingHours={restaurant.hours[0]}
                    view={view}
                    index={i}
                />
            ))}
        </>
    );
};

export default RestaurantsList;