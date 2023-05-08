import "./PhotosPage.css";
import CustomCollage from "../../common/components/CustomCollage/CustomCollage";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {getAllRestaurantPhotosByUserId} from "../../firebase/firebase";
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";

const PhotosPage = () => {

    const userId = useSelector(selectUserId);

    const [allPhotos, setAllPhotos] = useState(null);
    const [display, setDisplay] = useState("Uploaded");

    useEffect(() => {
        if (!userId) return;

        getAllRestaurantPhotosByUserId(userId)
            .then(data => setAllPhotos(data))
    }, [userId]);

    const changeDisplay = () => {
        setDisplay(display => display === "Uploaded" ? "Tagged" : "Uploaded");
    };

    const handleDeleteSelected = async (selectedImages) => {
        if (!selectedImages?.length) return;

        let updatedPhotos = [...allPhotos];

        // find check in and delete photo

        setAllPhotos(updatedPhotos);
    };

    return (
        <div className="photos-page-container">
            <ProfileNavigationView
                pageTitle="Photos"
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