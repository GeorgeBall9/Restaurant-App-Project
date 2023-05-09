import "./UploadImagePopup.css";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import PrimaryButton from "../buttonViews/PrimaryButton/PrimaryButton";
import {useState} from "react";
import {uploadImage} from "../../../firebase/firebase";
import Overlay from "../Overlay/Overlay";

const UploadImagePopup = ({handleCloseClick, handleUploadClick, shape = "rectangle"}) => {

    const [uploadButtonText, setUploadButtonText] = useState("Loading...");
    const [photoStoragePath, setPhotoStoragePath] = useState(null);
    const [photoUrl, setPhotoUrl] = useState("");
    const [previewLoaded, setPreviewLoaded] = useState(false);
    const [uploadPercentageIsVisible, setUploadPercentageIsVisible] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const handlePreviewLoad = () => {
        setUploadPercentageIsVisible(false);
        setPreviewLoaded(true);
        setUploadButtonText("Upload");
    };

    const handleFileChange = ({target}) => {
        const file = target.files[0];
        setUploadPercentageIsVisible(true);
        const storageRef = uploadImage(file, setPhotoUrl, setUploadPercentage);
        setPhotoStoragePath(storageRef._location.path);
    };

    const handleUpload = () => {
        setUploadButtonText("Uploading...");
        handleUploadClick(photoUrl, photoStoragePath);
    };

    return (
        <>
            <div className="uploaded-image-popup">
                <div className="popup-header">
                    <button onClick={handleCloseClick}>
                        Close
                    </button>

                    <button style={{visibility: "hidden"}}>
                        Close
                    </button>
                </div>

                <h3>Select an image</h3>

                <div>
                    <div className={`uploaded-image-container ${shape}`}>
                        {photoUrl && (
                            <img
                                src={photoUrl}
                                alt="image-preview"
                                style={{visibility: previewLoaded ? "visible" : "hidden"}}
                                onLoad={handlePreviewLoad}
                            />
                        )}

                        {uploadPercentageIsVisible && (
                            <div className="progress-display">{uploadPercentage} %</div>
                        )}
                    </div>

                    <UploadFileButton handleFileChange={handleFileChange}/>
                </div>

                {photoUrl && (
                    <PrimaryButton
                        handleClick={handleUpload}
                        text={uploadButtonText}
                        active={previewLoaded}
                        type="button"
                    />
                )}
            </div>

            <Overlay/>
        </>
    );
};

export default UploadImagePopup;