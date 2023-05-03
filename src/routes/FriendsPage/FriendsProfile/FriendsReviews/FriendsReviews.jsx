import "../../../PreviewReviews/PreviewReviews.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getReviewsByUserId } from "../../../../firebase/firebase";
import { selectReview } from "../../../../features/reviews/reviewsSlice";
import RestaurantImage from "../../../../common/components/RestaurantImage/RestaurantImage";
import StarRating from "../../../../common/components/StarRating/StarRating";
import { selectDisplayedFriend } from "../../../../features/user/userSlice";
import ProfileNavigationView from "../../../../common/components/ProfileNavigationView/ProfileNavigationView";
import NoResults from "../../../../common/components/NoResults/NoResults";

const FriendsReviews = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const displayedFriend = useSelector(selectDisplayedFriend);

    const [friendReviews, setFriendReviews] = useState(null);

    useEffect(() => {
        if (!displayedFriend) return;

        getReviewsByUserId(displayedFriend.id)
            .then(reviews => setFriendReviews(reviews))
    }, [displayedFriend]);

    const handleExpandClick = (reviewId, restaurantId) => {
        dispatch(selectReview(reviewId));
        navigate("/details/" + restaurantId);
    };

    return (
        <div className="preview-reviews-container">
            {displayedFriend && (
                <>
                    <ProfileNavigationView pageTitle={`${displayedFriend.displayName}'s Reviews`}/>

                    <main className="reviews-container container">
                        {friendReviews && friendReviews.length === 0 ? (
                            <NoResults mainText="No reviews found." subText={`${displayedFriend.displayName} hasn't written any reviews yet.`} />
                        ) : (
                            friendReviews && friendReviews.map(({ id, rating, title, content, restaurantId, restaurantName, photoUrl }) => (
                                <div key={id} className="review-card">
                                    <div className="container-lhs">
                                        <RestaurantImage photoUrl={photoUrl} name={restaurantName} />

                                        <div className="preview">
                                            <h3 style={{ margin: 0 }}>{title}</h3>

                                            <StarRating rating={rating} />

                                            <p>{content}</p>
                                        </div>
                                    </div>

                                    <div className="container-rhs">
                                        <button onClick={() => handleExpandClick(id, restaurantId)}>
                                            <FontAwesomeIcon icon={faExpand} className="icon" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </main>
                </>
            )}
        </div>
    );
};

export default FriendsReviews;