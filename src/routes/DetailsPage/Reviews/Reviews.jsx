import "./Reviews.css";
import StarRating from "../../../common/components/RestaurantCard/StarRating/StarRating";
import {faCircleUp as faSolidCircleUp} from "@fortawesome/free-solid-svg-icons";
import {faCircleUp} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {getReviewsByRestaurantId} from "../../../firebase/firebase";

const Reviews = ({restaurantId}) => {

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        if (!restaurantId) return;

        getReviewsByRestaurantId(restaurantId)
            .then(reviewsFound => setReviews(reviewsFound));
    }, [restaurantId]);

    return (
        <div className="reviews-container">
            {!reviews?.length && (
                <p>No reviews</p>
            )}

            {reviews && reviews.map(({id, title, rating, content, visitDate, reactions}) => (
                <div key={id} className="review">
                    <h3>{title}</h3>

                    <div className="rating-and-date-container">
                        <StarRating rating={rating}/>

                        <p>
                            <strong>Visit date: </strong>
                            {visitDate}
                        </p>
                    </div>

                    <p>{content}</p>

                    <div className="buttons-container">
                        <button>
                            <FontAwesomeIcon icon={faCircleUp} className="icon"/>
                        </button>

                        <p>{reactions.upVotes - reactions.downVotes}</p>

                        <button>
                            <FontAwesomeIcon icon={faCircleUp} className="icon"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;