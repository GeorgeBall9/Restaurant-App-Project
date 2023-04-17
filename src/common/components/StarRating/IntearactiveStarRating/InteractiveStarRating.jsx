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
      const isFullStar = i <= rating;
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

  return <div className="interactive-star-rating">{getStars()}</div>;
};

export default InteractiveStarRating;