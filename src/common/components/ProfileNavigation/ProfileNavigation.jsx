import "./ProfileNavigation.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const ProfileNavigation = ({pageTitle, button2Text, button2Handler}) => {

    const navigate = useNavigate();

    return (
        <header className="profile-navigation">
            <div className="container">
                <div className="upper-nav">
                    <button onClick={() => navigate(-1)}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>

                    <h1>{pageTitle}</h1>

                    {!button2Text && (
                        <button  style={{visibility: "hidden"}}>
                            <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                            Back
                        </button>
                    )}

                    {button2Text && (
                        <button onClick={button2Handler}>
                            {button2Text}
                        </button>
                    )}
                </div>

                <div className="lower-nav"></div>
            </div>
        </header>
    );
};

export default ProfileNavigation;