import './ReviewForm.css';
import React from "react";
import { useState } from 'react';

const ReviewForm = ({ restaurantName, location }) => {
    const [formData, setFormData] = useState({
        restaurantName: restaurantName || '',
        location: location || '',
        visitData: '',
        rating: '',
        review: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.restaurantName) {
            newErrors.restaurantName = 'Restaurant name is required';
        }

        if (!formData.location) {
            newErrors.location = 'Location is required';
        }

        if (!formData.visitDate) {
            newErrors.visitDate = 'Date of visit is required';
        }

        if (!formData.rating || formData.rating < 1 || formData.rating > 10) {
            newErrors.rating = 'Rating is required and must be between 1 and 10';
        }

        if (!formData.review || formData.review.length < 10 || formData.review.length > 500) {
            newErrors.review = 'Review is required and must be between 10 and 500 characters';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log(formData);
            setFormData({
                restaurantName: '',
                location: '',
                visitDate: '',
                rating: '',
                review: '',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="review-form-container">
            <div className="review-label-header">
                <label htmlFor="restaurantName">Restaurant Name:</label>
                <input name="restaurantName" value={formData.restaurantName} onChange={handleChange} />
                {errors.restaurantName && <p>{errors.restaurantName}</p>}
        
                <label htmlFor="location">Location:</label>
                <input name="location" value={formData.location} onChange={handleChange} />
                {errors.location && <p>{errors.location}</p>}

                <label htmlFor="visitDate">Date of Visit:</label>
                <input name="visitDate" type="date" value={formData.visitDate} onChange={handleChange} />
                {errors.visitDate && <p>{errors.visitDate}</p>}
            </div>

            <div className="review-rating">
                <label htmlFor="rating">Rating (1-10):</label>
                <input name="rating" type="number" min="1" max="10" value={formData.rating} onChange={handleChange} />
                {errors.rating && <p>{errors.rating}</p>}
            </div>

            <div className="review-text">
                <label htmlFor="review">Review:</label>
                <textarea name="review" value={formData.review} onChange={handleChange} />
                {errors.review && <p>{errors.review}</p>}
            </div>

            <button className="review-submit" type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;