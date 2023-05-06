import "./DetailsPopup.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faUpRightAndDownLeftFromCenter} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import ProfileNavigationView from "../../../common/components/ProfileNavigationView/ProfileNavigationView";
import DetailsCard from "./DetailsCard/DetailsCard";

const DetailsPopup = ({checkIns, date, closePopup, showPhotos, setSelectedCheckIn, updateCheckIn}) => {

    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleBackClick = () => {
        setIsVisible(false);

        setTimeout(() => {
            closePopup();
        }, 300);
    };

    return (
        <div className={`details-popup ${isVisible ? "visible" : ""} ${isExpanded ? "expanded" : ""}`}>
            <div>
                {isExpanded && (
                    <ProfileNavigationView
                        pageTitle={date}
                        button1={{handler: handleBackClick}}
                    />
                )}

                {!isExpanded && (
                    <div className="details-popup-header">
                        <div className="container">
                            <button onClick={handleBackClick}>
                                <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                                Back
                            </button>

                            <h2>{date}</h2>

                            <button onClick={() => setIsExpanded(true)}>
                                <FontAwesomeIcon className="icon" icon={faUpRightAndDownLeftFromCenter}/>
                            </button>
                        </div>
                    </div>
                )}

                <div className="details-popup-content">
                    {checkIns.map(checkIn => {
                        const {id, restaurant, date, userData, friendData, photoData} = checkIn;

                        return (
                            <DetailsCard
                                key={id}
                                id={id}
                                restaurant={restaurant}
                                date={date}
                                userData={userData}
                                friendData={friendData}
                                photoData={photoData}
                                closePopup={closePopup}
                                showPhotos={showPhotos}
                                setSelectedCheckIn={() => setSelectedCheckIn(checkIn)}
                                updateCheckIn={updateCheckIn}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DetailsPopup;