import "./PhotosPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import FormField from "../../common/components/FormField/FormField";
import {useState} from "react";
import {getImageDownloadUrl, uploadImage} from "../../firebase/firebase";

const PhotosPage = () => {

    const navigate = useNavigate();

    const [fileToUpload, setFileToUpload] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");

    const handleFileChange = ({target}) => {
        setFileToUpload(target.files[0]);
    };

    const handleSubmitClick = () => {
        uploadImage(fileToUpload);
    };

    const handleGetImageClick = async () => {
        const url = await getImageDownloadUrl();
        setDownloadUrl(url);
    };

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

            <main className="container">
                <FormField
                    label="File"
                    name="file"
                    type="file"
                    onChangeHandler={handleFileChange}
                />

                <button onClick={handleSubmitClick}>upload</button>

                <button onClick={handleGetImageClick}>Get image</button>

                <img src={downloadUrl}/>
            </main>
        </div>
    );
};

export default PhotosPage;