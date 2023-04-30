import "./ProfileNavigation.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";

const ProfileNavigation = ({
                               pageTitle,
                               button1,
                               button2,
                               toggleDisplayText,
                               toggleHandler,
                               count,
                               searchFunctionality,
                               button3,
                               button4
                           }) => {

    const navigate = useNavigate();

    return (
        <header className="profile-navigation">
            <div className="container">
                <div className="upper-nav">
                    {searchFunctionality && (
                        <SearchBox type="friends" matches={true}/>
                    )}

                    {!searchFunctionality && (
                        <button onClick={button1?.handler || (() => navigate(-1))}>
                            <FontAwesomeIcon className="icon" icon={button1?.icon || faArrowLeft}/>
                            {button1?.text || "Back"}
                        </button>
                    )}

                    {!searchFunctionality && <h1>{pageTitle}</h1>}

                    {!button2 && (
                        <button style={{visibility: "hidden"}}>
                            <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                            Back
                        </button>
                    )}

                    {button2 && (
                        <button onClick={button2.handler}>
                            {button2.icon && <FontAwesomeIcon className="icon" icon={button2.icon}/>}
                            {button2.text}
                        </button>
                    )}
                </div>

                {!searchFunctionality && toggleDisplayText && (
                    <div className="lower-nav">
                        <button className="toggle-display-button" onClick={toggleHandler}>
                            {toggleDisplayText}
                            <p className="count">{count}</p>
                        </button>

                        {button3 && (
                            <div className="buttons-container">
                                <button onClick={button3.handler}>
                                    {button3.text}
                                    <FontAwesomeIcon className="icon" icon={button3.icon}/>
                                </button>

                                <button onClick={button4.handler}>
                                    {button4.text}
                                    <FontAwesomeIcon className="icon" icon={button4.icon}/>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default ProfileNavigation;
