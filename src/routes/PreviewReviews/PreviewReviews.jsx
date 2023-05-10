import "./PreviewReviews.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";
import {deleteRestaurantReview, getReviewsByUserId} from "../../firebase/firebase";
import {deleteReview, selectReview, selectReviews, setReviews} from "../../features/reviews/reviewsSlice";
import ProfileNavigationView from "../../common/components/navigations/ProfileNavigationView/ProfileNavigationView";
import NoResults from "../../common/components/NoResults/NoResults";
import PreviewReviewCard from "./PreviewReviewCard/PreviewReviewCard";

const PreviewReviews = () => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const reviews = useSelector(selectReviews);

    const [fetchStatus, setFetchStatus] = useState("pending");

    useEffect(() => {
        if (!userId) return;

        getReviewsByUserId(userId)
            .then(data => {
                dispatch(setReviews(data));
                setFetchStatus("idle");
            });
    }, [userId]);

    return (
        <div className="preview-reviews-page-container">
            <ProfileNavigationView pageTitle="Reviews"/>

            <main className="preview-reviews-container container">
                {reviews?.length > 0 && (
                    reviews.map(review => (
                        <PreviewReviewCard
                            key={review.id}
                            review={review}
                            canDelete={true}
                        />
                    ))
                )}

                {!reviews?.length && fetchStatus === "idle" && (
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