import "./UserIcon.css";

import userIconImageSrc from "../../images/errorImage.png";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const sizesMap = {
    small: "40px",
    medium: "50px",
    large: "60px",
    larger: "70px",
    xLarge: "100px",
};

const UserIcon = ({size, colour = "#C23B22", skeleton = false, imageUrl = null}) => {

    const dimensions = sizesMap[size];
    let backgroundColor = (skeleton || imageUrl) ? "rgba(211, 211, 211, 0.3)" : colour;

    return (
        <div className="user-icon" style={{height: dimensions, width: dimensions, backgroundColor}}>
            {!skeleton && (
                <img
                    className={imageUrl ? "custom-image" : "avatar"}
                    src={imageUrl ? imageUrl : userIconImageSrc}
                    alt="user-icon"
                    loading="lazy"
                />
            )}

            {skeleton && <FontAwesomeIcon className="icon" icon={faUser}/>}
        </div>
    );
};

export default UserIcon;