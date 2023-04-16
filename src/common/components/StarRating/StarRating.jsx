import "./StarRating.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalfStroke} from "@fortawesome/free-solid-svg-icons";
import {faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons";

const StarRating = ({rating, hideNumber = false, colour}) => {

    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars > 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const style = {color: colour === "red" ? "#C23B22" : "#F49D1A"};

    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((star, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="icon" style={style}/>
            ))}

            {halfStar && <FontAwesomeIcon icon={faStarHalfStroke} className="icon" style={style}/>}

            {emptyStars > 0 && [...Array(emptyStars)].map((star, i) => (
                <FontAwesomeIcon key={i} icon={faEmptyStar} className="icon" style={style}/>
            ))}

            {!hideNumber && <span>{rating}</span>}
        </div>
    );
};

export default StarRating;