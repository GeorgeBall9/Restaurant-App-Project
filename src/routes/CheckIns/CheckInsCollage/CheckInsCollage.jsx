import "./CheckInsCollage.css";
import CustomCollage from "../../../common/components/CustomCollage/CustomCollage.jsx";

import {useEffect, useState} from "react";
import {
    addPhotoToCheckIn, deleteCheckInPhoto
} from "../../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";
import ProfileNavigationView from "../../../common/components/ProfileNavigationView/ProfileNavigationView";
import UploadImagePopup from "../../../common/components/UploadImagePopup/UploadImagePopup";
import {selectSelectedCheckIn, setSelectedCheckIn, updateCheckIn} from "../../../features/checkIns/checkInsSlice";

const CheckInsCollage = ({closePopup}) => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const checkIn = useSelector(selectSelectedCheckIn);

    const [restaurant, setRestaurant] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [addPhotoPopupIsVisible, setAddPhotoPopupIsVisible] = useState(false);
    const [selectMode, setSelectMode] = useState(false);

    useEffect(() => {
        if (!checkIn) return;

        if (checkIn.photoData.length === 0) {
            setSelectMode(false);
        }

        setRestaurant(checkIn.restaurant);
    }, [checkIn]);

    const handleBackClick = () => {
        setIsVisible(false);
        setTimeout(() => {
            closePopup();
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
        const updatedCheckIn = await addPhotoToCheckIn(userId, checkIn, photoStoragePath);
        dispatch(updateCheckIn(updatedCheckIn));
        dispatch(setSelectedCheckIn(updatedCheckIn));

        document.querySelector(".file-upload-input").value = "";
        handleClosePopupClick();
    };

    const handleSelectClick = () => {
        setSelectMode(selectMode => !selectMode);
    };

    const handleDeleteSelected = async (selectedImages) => {
        if (!selectedImages?.length) return;

        const updatedCheckIn = {...checkIn};

        for (const image of selectedImages) {
            const deleted = await deleteCheckInPhoto(userId, image.id, checkIn.id);

            if (deleted) {
                updatedCheckIn.photoData = updatedCheckIn.photoData.filter(photo => photo.id !== image.id);
            }
        }

        dispatch(updateCheckIn(updatedCheckIn));
        dispatch(setSelectedCheckIn(updatedCheckIn));
    };

    return (
        <div className={`collage-popup ${isVisible ? "visible" : ""}`}>
            <div>
                <ProfileNavigationView
                    pageTitle={restaurant?.name}
                    button1={{handler: handleBackClick}}
                    button2={checkIn.photoData?.length > 0 && {
                        text: selectMode ? "Cancel" : "Select",
                        handler: handleSelectClick
                    }}
                />

                <div className="collage-popup-photos">
                    <div className="collage-popup-content">
                        <CustomCollage
                            images={checkIn.photoData}
                            rows={100}
                            columns={2}
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
