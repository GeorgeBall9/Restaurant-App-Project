import "./PhotosPage.css";
import CustomCollage from "../CheckIns/CheckInsCollage/CustomCollage/CustomCollage";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {getAllRestaurantPhotosByUserId} from "../../firebase/firebase";
import ProfileNavigation from "../../common/components/ProfileNavigation/ProfileNavigation";

const PhotosPage = () => {

    const userId = useSelector(selectUserId);

    const [allPhotos, setAllPhotos] = useState(null);
    const [display, setDisplay] = useState("Uploaded");
    const [selectMode, setSelectMode] = useState(false);
    const [button2Text, setButton2Text] = useState(null);

    useEffect(() => {
        if (!userId) return;

        getAllRestaurantPhotosByUserId(userId)
            .then(data => setAllPhotos(data))
    }, [userId]);

    useEffect(() => {
        if (!allPhotos || display === "Tagged") {
            setButton2Text(null);
        } else {
            setButton2Text(selectMode ? "Cancel" : "Select");
        }
    }, [allPhotos, selectMode, display]);

    const changeDisplay = () => {
        setDisplay(display => display === "Uploaded" ? "Tagged" : "Uploaded");
    };

    const handleSelectClick = () => {
        setSelectMode(selectMode => !selectMode);
    };

    const handleDeleteSelected = async (selectedImages) => {
        if (!selectedImages?.length) return;

        let updatedPhotos = [...allPhotos];

        // find check in and delete photo

        setAllPhotos(updatedPhotos);

        if (!updatedPhotos.length) {
            handleSelectClick();
        }
    };

    return (
        <div className="photos-page-container">
            <ProfileNavigation
                pageTitle="Photos"
                button2Text={button2Text}
                button2Handler={handleSelectClick}
                lowerNav={true}
                toggleDisplayText={display === "Tagged" ? "Uploaded" : "Tagged"}
                toggleHandler={changeDisplay}
                count={display === "Tagged" ?
                    (allPhotos?.uploadedPhotos?.length ? allPhotos?.uploadedPhotos?.length : 0)
                    :
                    (allPhotos?.taggedPhotos?.length ? allPhotos?.taggedPhotos?.length : 0)
                }
            />

            <main>
                {display === "Uploaded" && allPhotos?.uploadedPhotos && (
                    <div className="collage-popup-photos collage-popup-photos-expanded">
                        <CustomCollage
                            images={allPhotos.uploadedPhotos}
                            rows={100}
                            columns={2}
                            addFunctionality={false}
                            selectMode={selectMode}
                            handleDeleteSelected={handleDeleteSelected()}
                        />
                    </div>
                )}

                {display === "Tagged" && allPhotos?.taggedPhotos && (
                    <div className="collage-popup-photos collage-popup-photos-expanded">
                        <CustomCollage
                            images={allPhotos.taggedPhotos}
                            rows={100}
                            columns={2}
                            addFunctionality={false}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default PhotosPage;