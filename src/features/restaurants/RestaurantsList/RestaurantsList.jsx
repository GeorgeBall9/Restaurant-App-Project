import RestaurantCard from "../../../common/components/RestaurantCard/RestaurantCard";
import {useSelector} from "react-redux";
import {selectRestaurants} from "../restaurantsSlice";
import MapRestaurantCard from "../../slider/Slider/MapRestaurantCard/MapRestaurantCard";
import HomeCard from "./HomeCard/HomeCard";

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
                        <HomeCard restaurant={restaurant}/>
                    )
                }
            })}
        </>
    );
};

export default RestaurantsList;