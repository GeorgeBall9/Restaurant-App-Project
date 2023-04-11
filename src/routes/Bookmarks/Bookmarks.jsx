import "./Bookmarks.css";
import {useSelector} from "react-redux";
import {selectBookmarks, selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import RestaurantCard from "../../common/components/RestaurantCard/RestaurantCard";
import {selectAllRestaurants} from "../../features/restaurants/restaurantsSlice";

const Bookmarks = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);
    const userBookmarks = useSelector(selectBookmarks);
    const allRestaurants = useSelector(selectAllRestaurants);

    const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState([]);

    useEffect(() => {
        if (!userId) {
            navigate("/profile");
        }
    }, [userId]);

    useEffect(() => {
        if (!userBookmarks || !allRestaurants) return;

        setBookmarkedRestaurants(userBookmarks
            .map(restaurantId => allRestaurants
                .find(restaurant => restaurant.id === restaurantId))
            .filter(restaurant => restaurant));
    }, [userBookmarks, allRestaurants]);

    const handleBackClick = () => {
        navigate("/profile");
    };

    return (
        <div className="bookmarks-page-container container">
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                    Back
                </button>

                <h1>Bookmarks</h1>

                <button style={{visibility: "hidden"}}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                    Back
                </button>
            </header>

            <main>
                {bookmarkedRestaurants.length > 0 && bookmarkedRestaurants.map((restaurant, i) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                ))}
            </main>
        </div>
    );
};

export default Bookmarks;