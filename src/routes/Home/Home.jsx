import {useNavigate} from "react-router-dom";

import "./Home.css";
import Navigation from "../../common/components/Navigation/Navigation";
import RestaurantsList from "../../features/restaurants/RestaurantsList/RestaurantsList";
import useFetchRestaurants from "../../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../../common/hooks/useFilterRestaurants";

const Home = () => {

    const navigate = useNavigate();

    useFetchRestaurants();
    useFilterRestaurants();

    const handleGoToMapClicked = () => navigate("/map");

    return (
        <div className="home container">
            <Navigation handleButtonClick={handleGoToMapClicked} view="home"/>

            <div className="restaurant-cards-container">
                <RestaurantsList/>
            </div>
        </div>
    );
}

export default Home;
