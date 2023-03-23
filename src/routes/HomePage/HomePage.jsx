import "./HomePage.css";
import Navigation from "../../common/components/Navigation/Navigation";
import RestaurantsList from "../../features/restaurants/RestaurantsList/RestaurantsList";

const HomePage = () => {

    return (
        <div className="home container">
            <Navigation view="home"/>

            <div className="restaurant-cards-container">
                <RestaurantsList/>
            </div>
        </div>
    );
}

export default HomePage;
