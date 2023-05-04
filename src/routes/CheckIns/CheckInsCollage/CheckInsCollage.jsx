import "./CheckInsCollage.css";
import NoResults from "../../../common/components/NoResults/NoResults";
import CustomCollage from "./CustomCollage/CustomCollage.jsx";
import CheckInsCard from "./CheckInsCard/CheckInsCard";

import { useEffect, useState } from "react";
import { faArrowLeft, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    addPhotoToCheckIn, deleteCheckInPhoto,
    getImageDownloadUrl,
    getPhotoUrlsFromPhotoIds,
} from "../../../firebase/firebase";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../features/user/userSlice";
import ProfileNavigationView from "../../../common/components/ProfileNavigationView/ProfileNavigationView";
import UploadImagePopup from "../../../common/components/UploadImagePopup/UploadImagePopup";

export const getPhotoUrls = async (photoPaths) => {
    if (!photoPaths?.length) return [];

    return await Promise.all(photoPaths.map(async (path, i) => {
        return { src: await getImageDownloadUrl(path), alt: "Photo " + (i + 1) };
    }));
};

const CheckInsCollage = ({ checkIn, onClose }) => {

    const userId = useSelector(selectUserId);

    const [restaurant, setRestaurant] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [addPhotoPopupIsVisible, setAddPhotoPopupIsVisible] = useState(false);
    const [selectMode, setSelectMode] = useState(false);

    useEffect(() => {
        if (!checkIn) return;

        setRestaurant(checkIn.restaurant);
    }, [checkIn]);

    useEffect(() => {
        if (!checkIn) return;

        getPhotoUrlsFromPhotoIds(checkIn.photoIds)
            .then(urls => {
                if (urls) {
                    setPhotos(urls);
                }
            });
    }, [checkIn]);

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

    const handleClosePopupClick = () => {
        setAddPhotoPopupIsVisible(false);
        document.querySelector(".file-upload-input").value = "";
    };

    const handleUploadPhotoClick = async (photoUrl, photoStoragePath) => {
        const newPhotoId = await addPhotoToCheckIn(userId, checkIn, photoStoragePath);
        const newPhotoData = { id: newPhotoId, url: photoUrl, alt: "Photo " + (photos.length + 1) };
        setPhotos(photos => [...photos, newPhotoData]);
        document.querySelector(".file-upload-input").value = "";
        handleClosePopupClick();
    };

    const handleSelectClick = () => {
        setSelectMode(selectMode => !selectMode);
    };

    const handleDeleteSelected = async (selectedImages) => {
        if (!selectedImages?.length) return;

        let updatedPhotos = [...photos];

        for (const image of selectedImages) {
            const deleted = await deleteCheckInPhoto(userId, image.id, checkIn.id);

            if (deleted) {
                updatedPhotos = updatedPhotos.filter(photo => photo.id !== image.id);
            }
        }

        setPhotos(updatedPhotos);

        if (!updatedPhotos.length) {
            handleSelectClick();
        }
    };

    return (
        <div className={`collage-popup ${isVisible ? "visible" : ""} ${isExpanded ? "expanded" : ""}`}>
            <div>
                {isExpanded && (
                    <ProfileNavigationView
                        pageTitle={restaurant?.name}
                        button2={{
                            text: photos.length > 0 && (selectMode ? "Cancel" : "Select"),
                            handler: handleSelectClick
                        }}
                    />
                )}

                {!isExpanded && (
                    <div className={`collage-popup-header ${isExpanded ? "collage-header-sticky" : ""}`}>
                        <div className="container">
                            <button onClick={handleBackClick}>
                                <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                                Back
                            </button>

                            <h2>{restaurant?.name}</h2>

                            <button onClick={handleExpand}>
                                <FontAwesomeIcon className="icon" icon={faUpRightAndDownLeftFromCenter} />
                            </button>
                        </div>
                    </div>
                )}

                <div className={`collage-popup-photos ${isExpanded ? "collage-popup-photos-expanded" : ""}`}>
                    <div className={`collage-popup-content ${isExpanded ? "collage-popup-content-expanded" : ""}`}>
                        {!isExpanded && (
                            <CheckInsCard
                                restaurant={restaurant?.name}
                                date={checkIn?.date}
                                userData={userId}
                                friendData={checkIn?.friendData}
                            />
                        )}
                        <CustomCollage
                            images={photos}
                            rows={isExpanded ? 100 : 1}
                            columns={isExpanded ? 2 : 3}
                            isExpanded={isExpanded}
                            onExpand={handleExpand}
                            handleAddClick={handleAddClick}
                            selectMode={selectMode}
                            handleDeleteSelected={handleDeleteSelected}
                        />
                    </div>

                </div>

                {addPhotoPopupIsVisible && (
                    <UploadImagePopup
                        handleCloseClick={handleClosePopupClick}
                        handleUploadClick={handleUploadPhotoClick}
                    />
                )}
            </div>
        </div>
    );
};

export default CheckInsCollage;
