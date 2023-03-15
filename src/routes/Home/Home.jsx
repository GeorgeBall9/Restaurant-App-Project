import RestaurantCard from "../../common/components/RestaurantCard/RestaurantCard";

import {useSelector} from "react-redux";
import {selectRestaurants} from "../../features/restaurants/restaurantsSlice";
import SearchBar from "../../common/components/SearchBar/SearchBar";

const Home = () => {

    const restaurants = useSelector(selectRestaurants);
    const testRestaurant = restaurants[0];

    return (
        <div className="home">
            <h1>Restaurant App</h1>

            <SearchBar/>

            <RestaurantCard {...testRestaurant} openingHours={testRestaurant.hours[0]} view="home"/>
        </div>
    );
}

export default Home;
