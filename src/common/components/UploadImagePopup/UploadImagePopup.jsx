import "./UploadImagePopup.css";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import {useState} from "react";
import {uploadImage} from "../../../firebase/firebase";
import Overlay from "../Overlay/Overlay";

const UploadImagePopup = ({handleCloseClick, handleUploadClick, shape = "rectangle"}) => {

    const [uploadButtonText, setUploadButtonText] = useState("Loading...");
    const [photoStoragePath, setPhotoStoragePath] = useState(null);
    const [photoUrl, setPhotoUrl] = useState("");
    const [previewLoaded, setPreviewLoaded] = useState(false);

    const handlePreviewLoad = () => {
        setPreviewLoaded(true);
        setUploadButtonText("Upload");
    };

    const handleFileChange = ({target}) => {
        const file = target.files[0];
        const storageRef = uploadImage(file, setPhotoUrl);
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