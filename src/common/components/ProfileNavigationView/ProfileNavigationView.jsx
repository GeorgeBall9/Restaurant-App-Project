import "./ProfileNavigationView.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";

const ProfileNavigationView = ({
                               pageTitle,
                               button1,
                               button2,
                               lowerNav,
                               toggleDisplayText,
                               toggleHandler,
                               count,
                               searchFunctionality,
                               button3,
                               button4,
                               handleSearchInputChange,
                               hasMatches
                           }) => {

    const navigate = useNavigate();

    return (
        <header className="profile-navigation">
            <div className="container">
                <div className="upper-nav">
                    {searchFunctionality && (
                        <SearchBox handleInputChange={handleSearchInputChange} hasMatches={hasMatches}/>
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

                {!searchFunctionality && lowerNav && (
                    <div className="lower-nav">
                        {toggleDisplayText && (
                            <button className="toggle-display-button" onClick={toggleHandler}>
                                {toggleDisplayText}
                                <p className="count">{count}</p>
                            </button>
                        )}

                        {button3 && (
                            <div className="buttons-container">
                                <button onClick={button3.handler}>
                                    {button3.text}
                                    {button3.icon && <FontAwesomeIcon className="icon" icon={button3.icon}/>}
                                </button>

                                <button onClick={button4.handler}>
                                    {button4.text}
                                    {button4.icon && <FontAwesomeIcon className="icon" icon={button4.icon}/>}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default ProfileNavigationView;
