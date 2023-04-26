import "./PhotosPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const PhotosPage = () => {

    const navigate = useNavigate();

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
        </div>
    );
};

export default PhotosPage;