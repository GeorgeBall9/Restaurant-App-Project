import "./ShareButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareFromSquare} from "@fortawesome/free-regular-svg-icons";
import {faCheck, faCircleCheck, faLink, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faTwitter, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {useState} from "react";
import {Link} from "react-router-dom";

const ShareButton = ({id, style}) => {

    const [popupIsVisible, setPopupIsVisible] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    const handleClick = () => {
        console.log("sharing to social media");
        setPopupIsVisible(true);
    };

    const handleCloseClick = () => {
        setPopupIsVisible(false);
    };

    const handleCopyLinkClick = () => {
        navigator.clipboard.writeText("https://restaurant-app-team22.netlify.app/details/" + id)
            .then(() => setLinkCopied(true));
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
                            <Link
                                to={"https://www.facebook.com/share.php?u=https://restaurant-app-team22.netlify.app/details/" + id}
                                className="copy-link-button"
                            >
                                <FontAwesomeIcon icon={faFacebookF} className="icon"/>
                            </Link>

                            <p>Facebook</p>
                        </div>

                        <div className="button-container">
                            <Link
                                to={"https://twitter.com/intent/tweet?url=https://restaurant-app-team22.netlify.app/details/" + id}
                                className="copy-link-button"
                            >
                                <FontAwesomeIcon icon={faTwitter} className="icon"/>
                            </Link>

                            <p>Twitter</p>
                        </div>

                        <div className="button-container">
                            <button onClick={handleCopyLinkClick} className="copy-link-button">
                                {!linkCopied && <FontAwesomeIcon icon={faLink} className="icon"/>}

                                {linkCopied && <FontAwesomeIcon icon={faCheck} className="icon"/>}
                            </button>

                            <p>{linkCopied ? "Copied" : "Copy Link"}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareButton;