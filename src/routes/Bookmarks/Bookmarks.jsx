import "./Bookmarks.css";
import {useSelector} from "react-redux";
import {selectBookmarks, selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faBan} from "@fortawesome/free-solid-svg-icons";
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
            .map(bookmark => allRestaurants.find(restaurant => restaurant.id === bookmark.id))
            .filter(restaurant => restaurant));
    }, [userBookmarks, allRestaurants]);

    const handleBackClick = () => {
        navigate("/profile");
    };

    return (
        <div className="bookmarks-page-container">
            <header>
                <div className="container">
                    <button onClick={handleBackClick}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>

                    <h1>Bookmarks</h1>

                    <button style={{visibility: "hidden"}}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>
                </div>
            </header>

            <main className="container">
                {bookmarkedRestaurants.length > 0 && bookmarkedRestaurants.map(restaurant => {
                    const {hours} = restaurant;
                    const now = new Date();
                    const day = now.getDay();
                    const hour = now.getHours();
                    const minute = now.getMinutes();
                    const openingHours = hours[day];

                    let isOpen = false;

                    if (openingHours !== "Closed") {
                        const totalMinutes = 60 * hour + minute;

                        const openingTimes = openingHours
                            .replaceAll(" ", "")
                            .split(",");


                        for (const time of openingTimes) {
                            const [open, close] = time.split("-");
                            const [openHour, openMinute] = open.split(":");
                            const [closeHour, closeMinute] = close.split(":");
                            const openMinutes = 60 * +openHour + +openMinute;
                            const closeMinutes = 60 * +closeHour + +closeMinute;

                            if (totalMinutes >= openMinutes && totalMinutes <= closeMinutes) {
                                isOpen = true;
                                break;
                            }
                        }
                    }

                    return (
                        <div key={restaurant.id} className="bookmark">
                            {!isOpen && (
                                <div className="closed-sign">
                                    Closed
                                    <FontAwesomeIcon className="icon" icon={faBan}/>
                                </div>
                            )}

                            <RestaurantCard restaurant={restaurant}/>
                        </div>
                    )
                })}
            </main>
        </div>
    );
};

export default Bookmarks;