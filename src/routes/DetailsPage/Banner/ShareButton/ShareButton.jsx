import "./ShareButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareFromSquare} from "@fortawesome/free-regular-svg-icons";
import {faLink, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faTwitter, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {useState} from "react";

const ShareButton = ({id, style}) => {

    const [popupIsVisible, setPopupIsVisible] = useState(false);

    const handleClick = () => {
        console.log("sharing to social media");
        setPopupIsVisible(true);
    };

    const handleCloseClick = () => {
        setPopupIsVisible(false);
    };

    return (
        <>
            <button className="share-button" onClick={handleClick}>
                <FontAwesomeIcon icon={faShareFromSquare} className="icon" style={style}/>
            </button>

            {popupIsVisible && (
                <div className="share-popup">
                    <h3>
                        <button style={{visibility: "hidden"}}>
                            <FontAwesomeIcon icon={faXmark} className="icon"/>
                        </button>

                        <p>Share</p>

                        <button onClick={handleCloseClick}>
                            <FontAwesomeIcon icon={faXmark} className="icon"/>
                        </button>
                    </h3>

                    <div className="buttons-container">
                        <div className="button-container">
                            <button className="copy-link-button">
                                <FontAwesomeIcon icon={faFacebookF} className="icon"/>
                            </button>

                            <p>Facebook</p>
                        </div>

                        <div className="button-container">
                            <button className="copy-link-button">
                                <FontAwesomeIcon icon={faTwitter} className="icon"/>
                            </button>

                            <p>Twitter</p>
                        </div>

                        <div className="button-container">
                            <button className="copy-link-button">
                                <FontAwesomeIcon icon={faWhatsapp} className="icon"/>
                            </button>

                            <p>WhatsApp</p>
                        </div>

                        <div className="button-container">
                            <button className="copy-link-button">
                                <FontAwesomeIcon icon={faLink} className="icon"/>
                            </button>

                            <p>Copy Link</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareButton;