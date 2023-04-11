import "./Reviews.css";
import StarRating from "../../../common/components/RestaurantCard/StarRating/StarRating";
import {faCircleUp as faSolidCircleUp} from "@fortawesome/free-solid-svg-icons";
import {faCircleUp} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {addUserReactionToReview, getReviewsByRestaurantId} from "../../../firebase/firebase";

const Reviews = ({userId, restaurantId}) => {

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        if (!restaurantId) return;

        getReviewsByRestaurantId(restaurantId)
            .then(reviewsFound => setReviews(reviewsFound));
    }, [restaurantId]);

    const handleUpVoteClick = async (reviewId) => {
        const reactions = await addUserReactionToReview(userId, reviewId, "upVotes");

        setReviews(reviews => {
            const foundReview = reviews.find(review => review.id === reviewId);
            const updatedReviews = reviews.filter(review => review.id !== reviewId);
            foundReview.reactions = reactions;
            updatedReviews.push(foundReview);
            return updatedReviews;
        });
    };

    const handleDownVoteClick = async (reviewId) => {
        const reactions = await addUserReactionToReview(userId, reviewId, "downVotes");

        setReviews(reviews => {
            const foundReview = reviews.find(review => review.id === reviewId);
            const updatedReviews = reviews.filter(review => review.id !== reviewId);
            foundReview.reactions = reactions;
            updatedReviews.push(foundReview);
            return updatedReviews;
        });
    };

    return (
        <div className="reviews-container">
            {!reviews?.length && (
                <p>No reviews available</p>
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
                        <button onClick={() => handleUpVoteClick(id)}>
                            {reactions.upVotes.includes(userId) && (
                                <FontAwesomeIcon icon={faSolidCircleUp} className="icon"/>
                            )}

                            {!reactions.upVotes.includes(userId) && (
                                <FontAwesomeIcon icon={faCircleUp} className="icon"/>
                            )}
                        </button>

                        <p>{+(reactions.upVotes.length - reactions.downVotes.length)}</p>

                        <button onClick={() => handleDownVoteClick(id)}>
                            {reactions.downVotes.includes(userId) && (
                                <FontAwesomeIcon icon={faSolidCircleUp} className="icon"/>
                            )}

                            {!reactions.downVotes.includes(userId) && (
                                <FontAwesomeIcon icon={faCircleUp} className="icon"/>
                            )}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;