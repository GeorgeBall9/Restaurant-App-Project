import "./CheckInsCollage.css";
import CustomCollage from "../../../common/components/CustomCollage/CustomCollage.jsx";

import {useEffect, useState} from "react";
import {
    addPhotoToCheckIn, deleteCheckInPhoto,
    getImageDownloadUrl, getPhotoDataFromPhotoIds,
} from "../../../firebase/firebase";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";
import ProfileNavigationView from "../../../common/components/ProfileNavigationView/ProfileNavigationView";
import UploadImagePopup from "../../../common/components/UploadImagePopup/UploadImagePopup";

export const getPhotoUrls = async (photoPaths) => {
    if (!photoPaths?.length) return [];

    return await Promise.all(photoPaths.map(async (path, i) => {
        return {src: await getImageDownloadUrl(path), alt: "Photo " + (i + 1)};
    }));
};

const CheckInsCollage = ({checkIn, onClose, isFriendsPage = false}) => {

    const userId = useSelector(selectUserId);

    const [restaurant, setRestaurant] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [addPhotoPopupIsVisible, setAddPhotoPopupIsVisible] = useState(false);
    const [selectMode, setSelectMode] = useState(false);

    useEffect(() => {
        if (!checkIn) return;

        setRestaurant(checkIn.restaurant);
    }, [checkIn]);

    useEffect(() => {
        if (!checkIn) return;

        getPhotoDataFromPhotoIds(checkIn.photoIds)
            .then(data => {
                if (data) {
                    setPhotos(data);
                }
            });
    }, [checkIn]);

    const handleBackClick = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
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
        const newPhotoData = {id: newPhotoId, url: photoUrl, alt: "Photo " + (photos.length + 1)};
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
        <div className={`collage-popup ${isVisible ? "visible" : ""}`}>
            <div>
                <ProfileNavigationView
                    pageTitle={restaurant?.name}
                    button2={(!isFriendsPage && photos.length > 0) && {
                        text: selectMode ? "Cancel" : "Select",
                        handler: handleSelectClick
                    }}
                />

                <div className="collage-popup-photos">
                    <div className="collage-popup-content">
                        <CustomCollage
                            images={photos}
                            rows={100}
                            columns={2}
                            handleAddClick={!isFriendsPage ? handleAddClick : null}
                            selectMode={selectMode}
                            handleDeleteSelected={!isFriendsPage ? handleDeleteSelected : null}
                            isFriendsPage={isFriendsPage}
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
