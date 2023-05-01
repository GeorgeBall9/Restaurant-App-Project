import "../../../PreviewReviews/PreviewReviews.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faExpand} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteRestaurantReview, getReviewsByUserId, getUserFromUserId} from "../../../../firebase/firebase";
import {deleteReview, selectReview, selectReviews, setReviews} from "../../../../features/reviews/reviewsSlice";
import RestaurantImage from "../../../../common/components/RestaurantImage/RestaurantImage";
import StarRating from "../../../../common/components/StarRating/StarRating";
import {selectDisplayedFriend} from "../../../../features/user/userSlice";
import ProfileNavigation from "../../../../common/components/ProfileNavigation/ProfileNavigation";


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

    const handleBackClick = () => {
        navigate(`/view-profile/${displayedFriend.id}`);
    };

    const handleExpandClick = (reviewId, restaurantId) => {
        dispatch(selectReview(reviewId));
        navigate("/details/" + restaurantId);
    };

    return (
        <div className="preview-reviews-container">
            {displayedFriend && (
                <>
                    <ProfileNavigation pageTitle={`${displayedFriend.displayName}'s Reviews`}/>

                    <main className="reviews-container container">
                        {friendReviews && friendReviews
                            .map(({id, rating, title, content, restaurantId, restaurantName, photoUrl}) => (
                            <div key={id} className="review-card">
                                <div className="container-lhs">
                                    <RestaurantImage photoUrl={photoUrl} name={restaurantName}/>

                                    <div className="preview">
                                        <h3 style={{margin: 0}}>{title}</h3>

                                        <StarRating rating={rating}/>

                                        <p>{content}</p>
                                    </div>
                                </div>

                                <div className="container-rhs">
                                    <button onClick={() => handleExpandClick(id, restaurantId)}>
                                        <FontAwesomeIcon icon={faExpand} className="icon"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </main>
                </>
            )}
        </div>
    );
};

export default FriendsReviews;