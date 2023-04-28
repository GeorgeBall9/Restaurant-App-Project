import "./CheckInsCollage.css";

import CustomCollage from "./CustomCollage/CustomCollage.jsx";
import {useState} from "react";
import {faArrowLeft, faImage, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormField from "../../../common/components/FormField/FormField";
import {uploadImage} from "../../../firebase/firebase";
import {useDispatch} from "react-redux";

const CheckInsCollage = ({restaurant, onClose}) => {

    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [addPhotoPopupIsVisible, setAddPhotoPopupIsVisible] = useState(false);
    const [photoUrl, setPhotoUrl] = useState("");
    const [photoStoragePath, setPhotoStoragePath] = useState(null);

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

    const handleFileChange = ({target}) => {
        const file = target.files[0];
        const storageRef = uploadImage(file, setPhotoUrl);
        setPhotoStoragePath(storageRef._location.path);
    };

    const handleAddPhotoClick = () => {
        console.log("adding photo to db")
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
                            <button onClick={() => setAddPhotoPopupIsVisible(false)}>
                                Close
                            </button>

                            <h2>Select a file to upload</h2>

                            <button style={{visibility: "hidden"}}>
                                Close
                            </button>
                        </div>

                        <div>
                            <div className="uploaded-image-container">
                                <img src={photoUrl}/>
                            </div>

                            <FormField
                                name="file"
                                type="file"
                                onChangeHandler={handleFileChange}
                                className="photo-upload-input"
                            />
                        </div>

                        <button onClick={handleAddPhotoClick}>Add photo</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckInsCollage;
