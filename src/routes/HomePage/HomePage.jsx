import "./HomePage.css";
import Navigation from "../../common/components/Navigation/Navigation";
import RestaurantsList from "../../features/restaurants/RestaurantsList/RestaurantsList";
import Spinner from "../../common/components/Spinner/Spinner";
import {useEffect} from "react";

const HomePage = () => {

    return (
        <div className="home container">
            <Navigation view="home"/>

            <Spinner/>

            <div className="restaurant-cards-container">
                <RestaurantsList view="home"/>
            </div>
        </div>
    );
}

export default HomePage;
