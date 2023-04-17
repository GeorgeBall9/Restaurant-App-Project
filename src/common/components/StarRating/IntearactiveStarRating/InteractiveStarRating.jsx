import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faEmptyStar} from "@fortawesome/free-regular-svg-icons";
import '../StarRating.css';

const InteractiveStarRating = ({rating, onClick, interactive}) => {
    const handleClick = (value) => {
        if (interactive) {
            onClick(value);
        }
    };

    const getStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFullStar = true;
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={isFullStar ? faStar : faEmptyStar}
                    className="icon"
                    onClick={() => handleClick(i)}
                />
            );
        }
        return stars;
    };

    return (
        <div className="interactive-star-rating">
            {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                    key={i}
                    icon={i + 1 <= rating ? faStar : faEmptyStar}
                    className="icon"
                    onClick={() => handleClick(i + 1)}
                />
            ))}
        </div>
    );
};

export default InteractiveStarRating;