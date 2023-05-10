import "./DetailsPopup.css";
import {
    faDownLeftAndUpRightToCenter,
    faUpRightAndDownLeftFromCenter,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import ProfileNavigationView from "../../../common/components/navigations/ProfileNavigationView/ProfileNavigationView";
import DetailsCard from "./DetailsCard/DetailsCard";
import {useSelector} from "react-redux";
import {selectSelectedCheckIns} from "../../../features/checkIns/checkInsSlice";

const DetailsPopup = ({date, closePopup, showPhotos}) => {

    const checkIns = useSelector(selectSelectedCheckIns);

    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(isExpanded => !isExpanded);
    };

    const handleBackClick = () => {
        setIsVisible(false);

        setTimeout(() => {
            closePopup();
        }, 300);
    };

    return (
        <div className={`details-popup ${isVisible ? "visible" : ""} ${isExpanded ? "expanded" : ""}`}>
            <div>
                <ProfileNavigationView
                    pageTitle={date}
                    style={
                        isExpanded ? {} : {backgroundColor: "rgba(0, 0, 0, 0.7)"}
                    }
                    button1={{text: "Close", icon: faXmark, handler: handleBackClick}}
                    button2={{
                        icon: isExpanded ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter,
                        handler: handleExpandClick
                    }}
                />

                <div className="details-popup-content">
                    {checkIns.map(checkIn => (
                        <DetailsCard
                            key={checkIn.id}
                            checkIn={checkIn}
                            closePopup={closePopup}
                            showPhotos={showPhotos}
                            expandPopup={() => setIsExpanded(true)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetailsPopup;