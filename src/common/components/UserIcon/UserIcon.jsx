import "./UserIcon.css";

import userIconImageSrc from "../../images/errorImage.png";

const UserIcon = ({colour}) => {
    return (
        <div className="user-icon">
            <img src={userIconImageSrc} alt="user-icon" loading="lazy"/>
        </div>
    );
};

export default UserIcon;