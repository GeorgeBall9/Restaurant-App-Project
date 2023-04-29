import "./PhotosPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import CustomCollage from "../CheckIns/CheckInsCollage/CustomCollage/CustomCollage";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {getAllRestaurantPhotosByUserId} from "../../firebase/firebase";

const PhotosPage = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const [allPhotos, setAllPhotos] = useState(null);

    useEffect(() => {
        if (!userId) return;

        getAllRestaurantPhotosByUserId(userId)
            .then(data => setAllPhotos(data))
    }, [userId]);

    return (
        <div className="photos-page-container">
            <header>
                <div className="container">
                    <button className="back-button" onClick={() => navigate("/profile")}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>

                    <h1>Photos</h1>

                    <button className="back-button" style={{visibility: "hidden"}}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>
                </div>
            </header>

            <main>
                {allPhotos?.uploadedPhotos && (
                    <div className="collage-popup-photos collage-popup-photos-expanded">
                        <CustomCollage
                            images={allPhotos.uploadedPhotos}
                            rows={100}
                            columns={2}
                            addFunctionality={false}
                        />
                    </div>
                )}

                {allPhotos?.taggedPhotos && (
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