import "../../../PreviewReviews/PreviewReviews.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExpand} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getReviewsByUserId} from "../../../../firebase/firebase";
import {selectReview} from "../../../../features/reviews/reviewsSlice";
import RestaurantImage from "../../../../common/components/RestaurantImage/RestaurantImage";
import StarRating from "../../../../common/components/StarRating/StarRating";
import {selectDisplayedFriend} from "../../../../features/user/userSlice";
import ProfileNavigationView from "../../../../common/components/ProfileNavigationView/ProfileNavigationView";
import NoResults from "../../../../common/components/NoResults/NoResults";
import PreviewReviewCard from "../../../PreviewReviews/PreviewReviewCard/PreviewReviewCard";

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
                    <ProfileNavigationView
                        pageTitle={`${displayedFriend.displayName.split(" ")[0]}'s Reviews`}
                    />

                    <main className="reviews-container container">
                        {friendReviews && friendReviews.length === 0 ? (
                            <NoResults
                                mainText="No reviews found."
                                subText={`${displayedFriend.displayName} hasn't written any reviews yet.`}
                            />
                        ) : (
                            friendReviews && friendReviews.map(review => (
                                <PreviewReviewCard
                                    key={review.id}
                                    review={review}
                                    canDelete={false}
                                />
                            ))
                        )}
                    </main>
                </>
            )}
        </div>
    );
};

export default FriendsReviews;