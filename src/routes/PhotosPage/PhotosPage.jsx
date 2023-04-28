import "./PhotosPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import FormField from "../../common/components/FormField/FormField";
import {useEffect, useState} from "react";
import {getImageDownloadUrl, uploadImage} from "../../firebase/firebase";
import CustomCollage from "../CheckIns/CheckInsCollage/CustomCollage/CustomCollage";
import {useSelector} from "react-redux";
import {selectAllPhotoUrls, selectUserId} from "../../features/user/userSlice";
import {getPhotoUrls} from "../CheckIns/CheckInsCollage/CheckInsCollage";

const PhotosPage = () => {

    const navigate = useNavigate();

    const userPhotos = useSelector(selectAllPhotoUrls);

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
                <div className="collage-popup-photos collage-popup-photos-expanded">
                    <CustomCollage
                        images={userPhotos}
                        rows={100}
                        columns={2}
                        addFunctionality={false}
                    />
                </div>
            </main>
        </div>
    );
};

export default PhotosPage;