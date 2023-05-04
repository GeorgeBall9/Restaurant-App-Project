import "./BookmarkCard/BookmarkCard.css";
import {useSelector} from "react-redux";
import {selectBookmarks, selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";
import RestaurantCard from "../../common/components/RestaurantCard/RestaurantCard";
import {getRestaurantById} from "../../firebase/firebase";
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";
import BookmarkCard from "./BookmarkCard/BookmarkCard";
import BookmarksView from "./BookmarksView/BookmarksView";

export const checkIsOpen = (restaurant) => {
    if (!restaurant) return false;

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

        for (let i = 0; i < minuteRanges.length; i++) {
            const range = minuteRanges[i];
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

        const formattedData = data.map(bookmark => {
            const updatedBookmark = {...bookmark};
            updatedBookmark.isOpen = checkIsOpen(bookmark);
            return updatedBookmark;
        });

        setBookmarkedRestaurants(formattedData);
    };

    useEffect(() => {
        if (!userId || !userBookmarks) return;

        setBookmarkData().then(() => {
            setBookmarkedRestaurants(bookmarkedRestaurants => bookmarkedRestaurants
                .sort(a => a.isOpen ? -1 : 1));
        });
    }, [userBookmarks]);

    return (
        <div className="bookmarks-page-container">
            <ProfileNavigationView pageTitle="Bookmarks"/>

            {bookmarkedRestaurants.length > 0 && (
                <BookmarksView bookmarkedRestaurants={bookmarkedRestaurants}/>
            )}
        </div>
    );
};

export default Bookmarks;