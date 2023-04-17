import "./InteractiveStars.css";
import "../../../../../common/components/StarRating/StarRating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";

const InteractiveStars = ({rating, onClick, hover, interactive = false}) => {
    return (
        <div className="star-rating">
            {[...Array(5)].map((star, i) => {
                const value = i + 1;
                const icon = value <= rating ? faStar : faEmptyStar;
                return (
                    <FontAwesomeIcon
                        key={i}
                        icon={icon}
                        className={`icon${interactive && hover && value === hover ? ' hover' : ''}`}
                        onClick={interactive ? () => onClick(value) : undefined}
                    />
                );
            })}

            <span>{rating}</span>
        </div>
    );
};

export default InteractiveStars;