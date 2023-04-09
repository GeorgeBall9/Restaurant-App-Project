import './ReviewForm.css';
import React from "react";
import { useState } from 'react';
import StarRating from '../../RestaurantCard/StarRating/StarRating';

const defaultFormFields = {
    rating: "",
    visitDate: "",
    title: "",
    review: "",
};

const ReviewForm = ({ restaurantName, location }) => {

    const [formData, setFormData] = useState(defaultFormFields);

    const {rating, visitDate, title, review} = formData;

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(null);

    const handleChange = ({target}) => {
        const { name, value } = target;
        setFormData({ ...formData, [name]: value });
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

        if (!review || review.length < 10 || review.length > 500) {
            newErrors.review = 'Review is required and must be between 10 and 500 characters';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log(formData);
            setFormData(defaultFormFields);
            setIsSubmitted(true);
        }
    };

    return (
        <div className="review-form-wrapper">
            <form onSubmit={handleSubmit} className="review-form-container">
                <div className="review-rating">
                    <label>Rating:</label>

                    <StarRating
                        rating={formData.rating}
                        onClick={handleStarRatingClick}
                        hover={hoveredStar}
                        interactive={true}
                    />

                    {errors.rating && <p>{errors.rating}</p>}
                </div>

                <div className="review-label-header">
                    <label>
                        Date of Visit:
                        <input name="visitDate" type="date" value={formData.visitDate} onChange={handleChange} />
                    </label>

                    {errors.visitDate && <p>{errors.visitDate}</p>}
                </div>

                <div className="title">
                    <label>
                        Title:
                        <input name="title" value={title} onChange={handleChange} />
                    </label>

                    {errors.review && <p>{errors.review}</p>}
                </div>

                <div className="review-text">
                    <label>
                        Review:
                        <textarea name="review" value={formData.review} onChange={handleChange} />
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