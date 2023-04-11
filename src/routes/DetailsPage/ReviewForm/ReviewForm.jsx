import './ReviewForm.css';
import React from "react";
import {useState} from 'react';
import StarRating from '../../../common/components/RestaurantCard/StarRating/StarRating';
import FormField from "../../../common/components/FormField/FormField";
import {addRestaurantReview} from "../../../firebase/firebase";

const defaultFormFields = {
    rating: "",
    visitDate: "",
    title: "",
    review: "",
};

const ReviewForm = ({restaurantId, userId}) => {

    const [formData, setFormData] = useState(defaultFormFields);

    const {rating, visitDate, title, review} = formData;

    const [errors, setErrors] = useState({});

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(null);

    const handleChange = ({target}) => {
        const {name, value} = target;
        setFormData({...formData, [name]: value});
    };

    const handleStarRatingClick = (value) => {
        handleChange({target: {name: 'rating', value: value.toString()}});
    };

    const validateForm = () => {
        const newErrors = {};

        if (!visitDate) {
            newErrors.visitDate = 'Date of visit is required';
        }

        if (!rating || rating < 1 || rating > 10) {
            newErrors.rating = 'Rating is required and must be between 1 and 10';
        }

        console.log(title.length)

        if (!title || title.length < 5 || title.length > 50) {
            newErrors.title = "Title is required and must be between 5 and 50 characters";
        }

        if (!review || review.length < 10 || review.length > 500) {
            newErrors.review = 'Review is required and must be between 10 and 500 characters';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            await addRestaurantReview(userId, restaurantId, formData);
            setFormData(defaultFormFields);
            setIsSubmitted(true);
        }
    };

    return (
        <div className="review-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Rating:

                        <StarRating
                            rating={rating}
                            onClick={handleStarRatingClick}
                            hover={hoveredStar}
                            interactive={true}
                        />
                    </label>

                    {errors.rating && <p>{errors.rating}</p>}
                </div>

                <div>
                    <FormField
                        label="Date of Visit:"
                        name="visitDate"
                        type="date"
                        value={visitDate}
                        onChangeHandler={handleChange}
                    />

                    {errors.visitDate && <p>{errors.visitDate}</p>}
                </div>

                <div>
                    <FormField
                        label="Title:"
                        name="title"
                        type="text"
                        value={title}
                        onChangeHandler={handleChange}
                    />

                    {errors.title && <p>{errors.title}</p>}
                </div>

                <div>
                    <label>
                        Review:
                        <textarea name="review" value={review} onChange={handleChange}/>
                    </label>

                    {errors.review && <p>{errors.review}</p>}
                </div>

                <button className="review-submit" type="submit">Submit Review</button>
            </form>

            {isSubmitted && (
                <div className="confirmation-overlay">
                    <h3>Thank you for your review!</h3>
                    <p>Your review has been submitted successfully.</p>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;