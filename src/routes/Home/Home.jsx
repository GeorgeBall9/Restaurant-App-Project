import {useNavigate} from "react-router-dom";

import "./Home.css";
import Navigation from "../../common/components/Navigation/Navigation";
import RestaurantsList from "../../features/restaurants/RestaurantsList/RestaurantsList";
import Spinner from "../../common/components/Spinner/Spinner";

const Home = () => {

    const navigate = useNavigate();

    const handleGoToMapClicked = () => navigate("/map");

    return (
        <div className="home container">
            <Navigation handleButtonClick={handleGoToMapClicked} view="home"/>

            <Spinner/>

            <div className="restaurant-cards-container">
                <RestaurantsList/>
            </div>
        </div>
    );
}

export default Home;
