import "./ReviewsListView.css";
import ReviewForm from "../../ReviewForm/ReviewForm";
import ReviewCard from "./ReviewCard/ReviewCard";
import {useState} from "react";

const ReviewsListView = ({
                             reviews,
                             userId,
                             preview,
                             handleVoteClick,
                             handleDeleteReview,
                         }) => {

    const [confirmDeleteReviewId, setConfirmDeleteReviewId] = useState(null);
    const [editingReviewId, setEditingReviewId] = useState(null);

    const handleConfirmDelete = () => {
        handleDeleteReview(confirmDeleteReviewId);
        setConfirmDeleteReviewId(null);
    };

    return (
        <div className="reviews-container">
            {!reviews?.length && (
                <p>No reviews available</p>
            )}

            {reviews && [...reviews]
                .slice(0, (preview ? 3 : reviews.length))
                .map(review => {
                    let {id, authorId, title, rating, content, visitDate} = review;

                    if (editingReviewId === id) {
                        visitDate = new Date(visitDate)
                            .toISOString()
                            .replaceAll("/", "-")
                            .split("T")
                            .at(0);

                        return <ReviewForm
                            key={id}
                            userId={authorId}
                            edit={true}
                            reviewId={id}
                            reviewData={{rating, visitDate, title, content}}
                            handleCancel={() => setEditingReviewId(null)}
                        />
                    }

                    return (
                        <ReviewCard
                            key={id}
                            review={review}
                            userId={userId}
                            handleVoteClick={handleVoteClick}
                            confirmDeleteReviewId={confirmDeleteReviewId}
                            handleNoClick={() => setConfirmDeleteReviewId(null)}
                            handleConfirmDelete={handleConfirmDelete}
                            handleEditClick={() => setEditingReviewId(id)}
                            handleDeleteClick={() => setConfirmDeleteReviewId(id)}
                        />
                    )
                })}
        </div>
    );
};

export default ReviewsListView;