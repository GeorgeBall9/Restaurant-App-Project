import "./ReviewFormView.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import UploadImagePopup from "../../UploadImagePopup/UploadImagePopup";
import InteractiveStarRating from "../../StarRating/IntearactiveStarRating/InteractiveStarRating";
import InversePrimaryButton from "../../InversePrimaryButton/InversePrimaryButton";
import FormField from "../../FormField/FormField";
import {useState} from "react";

const defaultFormFields = {
    rating: "",
    visitDate: new Date().toISOString().split("T")[0],
    title: "",
    content: "",
};

const ReviewFormView = ({handleSubmit, edit, reviewData, handleCancel, errors}) => {

    const [addImagesPopUpIsVisible, setAddImagesPopupIsVisible] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState(reviewData ? reviewData : defaultFormFields);
    const {rating, visitDate, title, content} = formData;

    const handleChange = ({target}) => {
        const {name, value} = target;
        setFormData({...formData, [name]: value});
    };

    const handleStarRatingClick = (value) => {
        handleChange({target: {name: 'rating', value}});
    };

    const handleClosePopupClick = () => {
        setAddImagesPopupIsVisible(false);
        document.querySelector(".file-upload-input").value = "";
    };

    const handleUploadPhotoClick = async (photoUrl, photoStoragePath) => {
        setUploadButtonText("Uploading...");
        document.querySelector(".file-upload-input").value = "";
        handleClosePopupClick();
    };

    const handleFormSubmit = () => {
        handleSubmit();
        setFormData(defaultFormFields);
        setIsSubmitted(true);
    };

    return (
        <div className="review-form">
            <form onSubmit={handleFormSubmit}>
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

export default ReviewFormView;