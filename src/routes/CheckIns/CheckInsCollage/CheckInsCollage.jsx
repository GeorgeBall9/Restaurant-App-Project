import "./CheckInsCollage.css";

import CustomCollage from "./CustomCollage/CustomCollage.jsx";
import {useEffect, useState} from "react";
import {
    faArrowLeft,
    faEllipsis,
    faImage,
    faMaximize,
    faUpRightAndDownLeftFromCenter,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormField from "../../../common/components/FormField/FormField";
import {addPhotoToRestaurantCheckIn, getImageDownloadUrl, uploadImage} from "../../../firebase/firebase";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";
import Overlay from "../../../features/overlay/Overlay/Overlay";

const CheckInsCollage = ({restaurant, onClose}) => {

    const userId = useSelector(selectUserId);

    const [photos, setPhotos] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [addPhotoPopupIsVisible, setAddPhotoPopupIsVisible] = useState(false);
    const [photoUrl, setPhotoUrl] = useState("");
    const [photoStoragePath, setPhotoStoragePath] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);

    const getPhotoUrls = async (photoPaths) => {
        return await Promise.all(photoPaths.map(async (path, i) => {
            return {src: await getImageDownloadUrl(path), alt: "Photo " + (i + 1)}
        }));
    };

    useEffect(() => {
        if (!restaurant) return;

        getPhotoUrls(restaurant.photoPaths)
            .then(urls => {
                console.log(urls)
                setPhotos(urls)
            });
    }, [restaurant])

    const handleBackClick = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const handleAddClick = () => {
        setAddPhotoPopupIsVisible(true);
        setShowOverlay(true);
    };

    const handleCloseClick = () => {
        setAddPhotoPopupIsVisible(false);
        setShowOverlay(false);
    }

    const handleFileChange = ({target}) => {
        const file = target.files[0];
        const storageRef = uploadImage(file, setPhotoUrl);
        setPhotoStoragePath(storageRef._location.path);
    };

    const handleUploadPhotoClick = async () => {
        console.log("adding photo to db");
        await addPhotoToRestaurantCheckIn(userId, restaurant.id, restaurant.date, photoStoragePath);
        handleCloseClick();
    };

    return (
        <div className={`collage-popup ${isVisible ? "visible" : ""} ${isExpanded ? "expanded" : ""}`}>
            <div>
                <div className={`collage-popup-header ${isExpanded ? "collage-header-sticky" : ""}`}>
                    <button onClick={handleBackClick}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>

                    <h2>{restaurant.name}</h2>

                    {isExpanded && (
                        <button onClick={handleAddClick}>
                            {addPhotoPopupIsVisible ? "Cancel" : "Add"}

                            {!addPhotoPopupIsVisible && (
                                <FontAwesomeIcon className="icon" icon={faImage}/>
                            )}
                        </button>
                    )}

                    {!isExpanded && (
                        <button onClick={handleExpand}>
                            <FontAwesomeIcon className="icon" icon={faUpRightAndDownLeftFromCenter}/>
                        </button>
                    )}
                </div>

                <div className={`collage-popup-photos ${isExpanded ? "collage-popup-photos-expanded" : ""}`}>
                    <CustomCollage
                        images={photos}
                        rows={isExpanded ? 100 : 2}
                        columns={isExpanded ? 2 : 2}
                        onExpand={handleExpand}
                    />
                </div>

                {showOverlay && <Overlay/>}

                {addPhotoPopupIsVisible && (
                    <div className="add-photo-popup">
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
                            <div className="uploaded-image-container">
                                {photoUrl && <img src={photoUrl}/>}
                            </div>

                            <FormField
                                name="file"
                                type="file"
                                onChangeHandler={handleFileChange}
                                className="photo-upload-input"
                            />
                        </div>

                        <button className="upload-button" onClick={handleUploadPhotoClick}>Upload</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckInsCollage;
