import './ReviewForm.css';
import {useState} from 'react';
import FormField from "../FormField/FormField";
import {addPhotoToCheckIn, addRestaurantReview, updateRestaurantReview} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {addReview, updateReview} from "../../../features/reviews/reviewsSlice";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {selectDisplayName, selectIconColour} from "../../../features/user/userSlice";
import InteractiveStarRating
    from '../StarRating/IntearactiveStarRating/InteractiveStarRating';
import InversePrimaryButton from "../InversePrimaryButton/InversePrimaryButton";
import UploadImagePopup from "../UploadImagePopup/UploadImagePopup";

const defaultFormFields = {
    rating: "",
    visitDate: new Date().toISOString().split("T")[0],
    title: "",
    content: "",
};

const ReviewForm = ({restaurant, userId, edit, reviewId, reviewData, handleCancel}) => {

    const dispatch = useDispatch();

    const displayName = useSelector(selectDisplayName);
    const iconColour = useSelector(selectIconColour);

    const [formData, setFormData] = useState(reviewData ? reviewData : defaultFormFields);
    const {rating, visitDate, title, content} = formData;

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [addImagesPopUpIsVisible, setAddImagesPopupIsVisible] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState("");

    const handleChange = ({target}) => {
        const {name, value} = target;
        setFormData({...formData, [name]: value});
    };

    const handleStarRatingClick = (value) => {
        handleChange({target: {name: 'rating', value}});
    };

    const validateForm = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
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

            setFormData(defaultFormFields);
            setIsSubmitted(true);
        }
    };

    const handleClosePopupClick = () => {
        setAddImagesPopupIsVisible(false);
        // setShowOverlay(false);
        document.querySelector(".file-upload-input").value = "";
    };

    const handleUploadPhotoClick = async (photoUrl, photoStoragePath) => {
        setUploadButtonText("Uploading...");
        document.querySelector(".file-upload-input").value = "";
        handleClosePopupClick();
    };

    return (
        <div className="review-form">
            <form onSubmit={handleSubmit}>
                {edit && (
                    <h2 style={{margin: 0}}>
                        Editing
                        <FontAwesomeIcon icon={faPen} className="edit-icon"/>
                    </h2>
                )}

                {addImagesPopUpIsVisible && (
                    <UploadImagePopup
                        text={uploadButtonText}
                        handleCloseClick={handleClosePopupClick}
                        handleUploadClick={handleUploadPhotoClick}
                    />
                )}

                <div className="review-form-header">
                    <div>
                        <label>
                            Rating:
                            <InteractiveStarRating
                                rating={rating}
                                onClick={handleStarRatingClick}
                                interactive={true}
                            />
                        </label>

                        {errors.rating && <p>{errors.rating}</p>}
                    </div>

                    <InversePrimaryButton
                        text="Add image"
                        type="button"
                        handleClick={() => setAddImagesPopupIsVisible(true)}
                    />
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
                        <textarea name="content" value={content} onChange={handleChange}/>
                    </label>

                    {errors.review && <p>{errors.review}</p>}
                </div>

                {!edit && <button className="review-submit" type="submit">Submit review</button>}

                {edit && (
                    <div className="buttons-container">
                        <button className="review-submit" type="submit">Save</button>
                        <button onClick={handleCancel} type="button" className="cancel">Cancel</button>
                    </div>
                )}
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
