import './ReviewFormView/ReviewFormView.css';
import {useState} from 'react';
import {addRestaurantReview, createNewRestaurantPhotoDoc, updateRestaurantReview} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {addReview, updateReview} from "../../../features/reviews/reviewsSlice";
import {selectDisplayName, selectIconColour} from "../../../features/user/userSlice";
import ReviewFormView from "./ReviewFormView/ReviewFormView";

const ReviewForm = ({restaurant, userId, edit, reviewId, reviewData, handleCancel}) => {

    const dispatch = useDispatch();

    const displayName = useSelector(selectDisplayName);
    const iconColour = useSelector(selectIconColour);

    const [errors, setErrors] = useState({});
    const [photoUploaded, setPhotoUploaded] = useState(false);

    const handleUploadPhotoClick = async (photoUrl, photoStoragePath) => {
        const photoId = await createNewRestaurantPhotoDoc(userId, restaurant.id, photoStoragePath);
        setPhotoUploaded(true);
    };

    const validateForm = (rating, visitDate, title, content) => {
        const newErrors = {};

        if (!visitDate) {
            newErrors.visitDate = 'Date of visit is required';
        }

        if (!rating || rating < 1 || rating > 10) {
            newErrors.rating = 'Rating is required';
        }

        if (!title || title.length < 5 || title.length > 50) {
            newErrors.title = "Title is required and must be between 5 and 50 characters";
        }

        if (!content || content.length < 10 || content.length > 500) {
            newErrors.review = 'Review is required and must be between 10 and 500 characters';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event, formFields) => {
        event.preventDefault();

        const {rating, visitDate, title, content} = formFields;

        if (validateForm(rating, visitDate, title, content)) {
            const data = {rating: +rating, visitDate: +new Date(visitDate), title, content};

            if (edit) {
                const updatedReview = await updateRestaurantReview(reviewId, data);

                dispatch(updateReview({
                    reviewId, updatedReview: {
                        ...updatedReview,
                        displayName,
                        iconColour,
                    }
                }));

                handleCancel();
            } else {
                const newReview = await addRestaurantReview(userId, restaurant, data);

                dispatch(addReview({
                    ...newReview,
                    displayName,
                    iconColour,
                }));
            }
        }
    };

    return (
        <ReviewFormView
            edit={edit}
            reviewData={reviewData}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            errors={errors}
            handleUploadPhotoClick={handleUploadPhotoClick}
            photoUploaded={photoUploaded}
        />
    );
};

export default ReviewForm;
