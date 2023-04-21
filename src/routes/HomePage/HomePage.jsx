import "./HomePage.css";
import Navigation from "../../common/components/Navigation/Navigation";
import RestaurantsList from "../../features/restaurants/RestaurantsList/RestaurantsList";
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurantsFetchStatus} from "../../features/restaurants/restaurantsSlice";
import {useEffect} from "react";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";

const HomePage = () => {

    const dispatch = useDispatch();
    const fetchStatus = useSelector(selectRestaurantsFetchStatus);

    useEffect(() => {
        if (fetchStatus === "pending") {
            dispatch(showSpinner());
        } else {
            dispatch(hideSpinner());
        }
    }, [fetchStatus]);

    useEffect(() => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch('https://api.content.tripadvisor.com/api/v1/location/19769400/photos?key=BE426B015C564B468170E8FAA5ACA4C5&language=en', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    });

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
