import "./Bookmarks.css";
import {useSelector} from "react-redux";
import {selectBookmarks, selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faBan} from "@fortawesome/free-solid-svg-icons";
import RestaurantCard from "../../common/components/RestaurantCard/RestaurantCard";
import {getRestaurantById} from "../../firebase/firebase";

export const checkIsOpen = (restaurant) => {
    let {minutes} = restaurant;
    const now = new Date();
    const day = now.getDay();
    const openingMinutes = minutes[day];

    let isOpen = false;

    if (openingMinutes !== "Closed") {
        const hour = now.getHours();
        const minute = now.getMinutes();
        const totalMinutes = 60 * hour + minute;

        const minuteRanges = openingMinutes.replaceAll(" ", "").split(",");

        for (const range of minuteRanges) {
            const [openMinutes, closeMinutes] = range.split("-");

            if (totalMinutes >= +openMinutes && totalMinutes <= +closeMinutes) {
                isOpen = true;
                break;
            }
        }
    }

    return isOpen;
};

const Bookmarks = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);
    const userBookmarks = useSelector(selectBookmarks);

    const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState([]);

    useEffect(() => {
        if (!userId) {
            navigate("/profile");
        }
    }, [userId]);

    const setBookmarkData = async ()  => {
        const data = await Promise.all(userBookmarks
            .map(async (bookmark) => await getRestaurantById(bookmark)));

        setBookmarkedRestaurants(data);
    };

    useEffect(() => {
        if (!userId || !userBookmarks) return;

        setBookmarkData().then(response => console.log("Bookmarks retrieved"));
    }, [userBookmarks]);

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
                {bookmarkedRestaurants.length > 0 && bookmarkedRestaurants.map(restaurant => (
                    <div key={restaurant.id} className="bookmark">
                        {!restaurant.isOpen && (
                            <div className="closed-sign">
                                Closed
                                <FontAwesomeIcon className="icon" icon={faBan}/>
                            </div>
                        )}

                        <RestaurantCard restaurant={restaurant}/>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Bookmarks;