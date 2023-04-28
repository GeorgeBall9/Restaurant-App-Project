import "./CheckInsCollage.css";

import CustomCollage from "./CustomCollage/CustomCollage.jsx";
import {useEffect, useState} from "react";
import {faArrowLeft, faImage, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormField from "../../../common/components/FormField/FormField";
import {addPhotoToRestaurantCheckIn, uploadImage} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {hideOverlay, showOverlay} from "../../../features/overlay/overlaySlice";
import {selectUserId} from "../../../features/user/userSlice";

const CheckInsCollage = ({restaurant, onClose}) => {

    const userId = useSelector(selectUserId);

    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [addPhotoPopupIsVisible, setAddPhotoPopupIsVisible] = useState(false);
    const [photoUrl, setPhotoUrl] = useState("");
    const [photoStoragePath, setPhotoStoragePath] = useState(null);

    useEffect(() => {
        console.log(restaurant)
    }, [restaurant])

    const demoPhotos = [
        { src: "https://picsum.photos/id/1011/600/400", alt: "Photo 1" },
        { src: "https://picsum.photos/id/1012/600/400", alt: "Photo 2" },
        { src: "https://picsum.photos/id/1013/600/400", alt: "Photo 3" },
        { src: "https://picsum.photos/id/1014/600/400", alt: "Photo 4" },
        { src: "https://picsum.photos/id/1015/600/400", alt: "Photo 5" },
        { src: "https://picsum.photos/id/1016/600/400", alt: "Photo 6" },
        { src: "https://picsum.photos/id/1010/600/400", alt: "Photo 7" },
        { src: "https://picsum.photos/id/1018/600/400", alt: "Photo 8" },
        { src: "https://picsum.photos/id/1019/600/400", alt: "Photo 9" },
        { src: "https://picsum.photos/id/1020/600/400", alt: "Photo 10" },
        { src: "https://picsum.photos/id/1021/600/400", alt: "Photo 11" },
        { src: "https://picsum.photos/id/1022/600/400", alt: "Photo 11" },
    ];

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
    };

    const handleCloseClick = () => {
        setAddPhotoPopupIsVisible(false);
    }

    const handleFileChange = ({target}) => {
        const file = target.files[0];
        const storageRef = uploadImage(file, setPhotoUrl);
        setPhotoStoragePath(storageRef._location.path);
    };

    const handleUploadPhotoClick = async () => {
        console.log("adding photo to db");
        await addPhotoToRestaurantCheckIn(userId, restaurant.id, restaurant.date, photoStoragePath);
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

                    <button onClick={handleAddClick}>
                        {addPhotoPopupIsVisible ? "Cancel" : "Add"}

                        {!addPhotoPopupIsVisible && <FontAwesomeIcon className="icon" icon={faImage}/>}
                    </button>
                </div>

                <div className={`collage-popup-photos ${isExpanded ? "collage-popup-photos-expanded" : ""}`}>
                    <CustomCollage
                        images={demoPhotos}
                        rows={isExpanded ? 100 : 2}
                        columns={isExpanded ? 2 : 2}
                        onExpand={handleExpand}
                    />
                </div>

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
