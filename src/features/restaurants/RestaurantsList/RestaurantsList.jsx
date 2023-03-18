import RestaurantCard from "../../../common/components/RestaurantCard/RestaurantCard";
import {useSelector} from "react-redux";
import {selectRestaurants} from "../restaurantsSlice";
import useFetchRestaurants from "../../../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../../../common/hooks/useFilterRestaurants";
import MapRestaurantCard from "../../slider/Slider/MapRestaurantCard/MapRestaurantCard";

const RestaurantsList = ({view}) => {

    useFetchRestaurants();
    useFilterRestaurants();

    const restaurants = useSelector(selectRestaurants);

    return (
        <>
            {restaurants && restaurants.map((restaurant, i) => {
                if (view === "map") {
                    return (
                        <MapRestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            index={i}
                        />
                    )
                } else {
                    return (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            openingHours={restaurant.hours[0]}
                        />
                    )
                }
            })}
        </>
    );
};

export default RestaurantsList;