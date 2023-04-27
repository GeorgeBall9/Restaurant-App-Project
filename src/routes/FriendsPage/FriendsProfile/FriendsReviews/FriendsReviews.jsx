import "../../../PreviewReviews/PreviewReviews.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExpand, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {selectUserId} from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import { deleteRestaurantReview, getReviewsByUserId, getUserFromUserId } from "../../../../firebase/firebase";
import { deleteReview, selectReview, selectReviews, setReviews } from "../../../../features/reviews/reviewsSlice";
import RestaurantImage from "../../../../common/components/RestaurantImage/RestaurantImage";
import StarRating from "../../../../common/components/StarRating/StarRating";


const FriendsReviews = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { userId } = useParams();

    const [friendReviews, setFriendReviews] = useState(null);
    const [friendProfile, setFriendProfile] = useState("");

    useEffect(() => {
        if (!userId) return;

        const fetchFriendProfile = async () => {
            const user = await getUserFromUserId(userId);
            setFriendProfile(user);

            const reviews = await getReviewsByUserId(userId);
            setFriendReviews(reviews);
        };

        fetchFriendProfile();
    }, [userId]);

    const handleBackClick = () => {
        navigate(`/view-profile/${userId}`);
    };

    const handleExpandClick = (reviewId, restaurantId) => {
        dispatch(selectReview(reviewId));
        navigate("/details/" + restaurantId);
    };

    return (
        <div className="preview-reviews-container">
            <header>
                <div className="container">
                    <button onClick={handleBackClick}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                        Back
                    </button>

                    <h1>{friendProfile.displayName}'s Reviews</h1>

                    <button style={{ visibility: "hidden" }}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                        Back
                    </button>
                </div>
            </header>

            <main className="reviews-container container">
                {friendReviews && friendReviews.map(({ id, rating, title, content, restaurantId, restaurantName, photoUrl }) => (
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
                ))}
            </main>
        </div>
    );
};

export default FriendsReviews;