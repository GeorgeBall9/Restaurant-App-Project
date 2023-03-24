import RestaurantCard from "../../../common/components/RestaurantCard/RestaurantCard";
import {useSelector} from "react-redux";
import {selectRestaurants} from "../restaurantsSlice";
import useFetchRestaurants from "../../../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../../../common/hooks/useFilterRestaurants";
import MapRestaurantCard from "../../slider/Slider/MapRestaurantCard/MapRestaurantCard";

const RestaurantsList = ({view}) => {

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
                        />
                    )
                }
            })}
        </>
    );
};

export default RestaurantsList;