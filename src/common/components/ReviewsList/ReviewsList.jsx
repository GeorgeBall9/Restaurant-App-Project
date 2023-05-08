import "./ReviewsList.css";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewCard from "./ReviewCard/ReviewCard";
import {useRef, useState} from "react";

const ReviewsList = ({restaurant, reviews, userId}) => {

    const [editingReviewId, setEditingReviewId] = useState(null);

    return (
        <div className="reviews-container">
            {!reviews?.length && (
                <p>No reviews available</p>
            )}

            {reviews && reviews.map(review => {
                    let {id, authorId, title, rating, content, visitDate} = review;

                    if (editingReviewId === id) {
                        visitDate = new Date(visitDate)
                            .toISOString()
                            .replaceAll("/", "-")
                            .split("T")
                            .at(0);

                        return <ReviewForm
                            key={id}
                            restaurant={restaurant}
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
                            handleEditClick={() => setEditingReviewId(id)}
                        />
                    )
                })}
        </div>
    );
};

export default ReviewsList;