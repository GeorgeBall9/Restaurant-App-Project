import "./BookmarkCard.css";
import RestaurantCard from "../../../common/components/RestaurantCard/RestaurantCard";
import ClosedSign from "./ClosedSign/ClosedSign";

const BookmarkCard = ({restaurant}) => {

    const {isOpen} = restaurant;

    return (
        <div className="bookmark-card">
            {!isOpen && <ClosedSign/>}

            <RestaurantCard restaurant={restaurant} open={isOpen}/>
        </div>
    );
};

export default BookmarkCard;