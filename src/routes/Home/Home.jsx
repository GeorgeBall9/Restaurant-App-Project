import RestaurantCard from "../../common/components/RestaurantCard/RestaurantCard";

import {useSelector} from "react-redux";
import {selectRestaurants} from "../../features/restaurants/restaurantsSlice";

const Home = () => {

    const restaurants = useSelector(selectRestaurants);
    const testRestaurant = restaurants[0];

    return (
        <div className="home">
            <h1>Restaurant App</h1>

            <RestaurantCard {...testRestaurant}/>
        </div>
    );
}

export default Home;
