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
    const [display, setDisplay] = useState("Uploaded");

    useEffect(() => {
        if (!userId) return;

        getAllRestaurantPhotosByUserId(userId)
            .then(data => setAllPhotos(data))
    }, [userId]);

    const changeDisplay = () => {
        setDisplay(display => display === "Uploaded" ? "Tagged" : "Uploaded");
    };

    return (
        <div className="photos-page-container">
            <header>
                <div className="container">
                    <div className="upper-nav">
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

                    <div className="lower-nav">
                        <button className="toggle-photos-button" onClick={changeDisplay}>
                            {display === "Tagged" ? "Uploaded" : "Tagged"}

                            <p className="count">
                                {display === "Tagged" ?
                                    (allPhotos?.uploadedPhotos?.length ? allPhotos?.uploadedPhotos?.length : 0)
                                    :
                                    (allPhotos?.taggedPhotos?.length ? allPhotos?.taggedPhotos?.length : 0)
                                }
                            </p>
                        </button>
                    </div>
                </div>
            </header>

            <main>
                {display === "Uploaded" && allPhotos?.uploadedPhotos && (
                    <div className="collage-popup-photos collage-popup-photos-expanded">
                        <CustomCollage
                            images={allPhotos.uploadedPhotos}
                            rows={100}
                            columns={2}
                            addFunctionality={false}
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