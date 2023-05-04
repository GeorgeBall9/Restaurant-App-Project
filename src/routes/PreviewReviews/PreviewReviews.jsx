import "./PreviewReviews.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useEffect} from "react";
import {deleteRestaurantReview, getReviewsByUserId} from "../../firebase/firebase";
import {deleteReview, selectReview, selectReviews, setReviews} from "../../features/reviews/reviewsSlice";
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";
import NoResults from "../../common/components/NoResults/NoResults";
import PreviewReviewCard from "./PreviewReviewCard/PreviewReviewCard";

const PreviewReviews = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const reviews = useSelector(selectReviews);

    useEffect(() => {
        if (!userId) return;

        getReviewsByUserId(userId)
            .then(data => dispatch(setReviews(data)));
    }, [userId]);

    const handleDelete = async (reviewId) => {
        await deleteRestaurantReview(userId, reviewId);
        dispatch(deleteReview(reviewId));
    };

    const handleExpandClick = (reviewId, restaurantId) => {
        dispatch(selectReview(reviewId));
        navigate("/details/" + restaurantId);
    };

    return (
        <div className="preview-reviews-page-container">
            <ProfileNavigationView pageTitle="Reviews"/>

            <main className="preview-reviews-container container">
                {reviews && reviews.length > 0 ? (
                    reviews.map(review => (
                        <PreviewReviewCard
                            key={review.id}
                            review={review}
                            handleDelete={handleDelete}
                            handleExpandClick={handleExpandClick}
                        />
                    ))
                ) : (
                    <NoResults
                        mainText="You haven't written any reviews yet."
                        subText="Write some restaurant reviews, and view them here!"
                    />
                )}
            </main>
        </div>
    );
};

export default PreviewReviews;