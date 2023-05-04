import "./BookmarksView.css";
import BookmarkCard from "../BookmarkCard/BookmarkCard";

const BookmarksView = ({bookmarkedRestaurants}) => {
    return (
        <div className="bookmarks-view container">
            {bookmarkedRestaurants.map(restaurant => (
                <BookmarkCard key={restaurant.id} restaurant={restaurant}/>
            ))}
        </div>
    );
};

export default BookmarksView;