import "./UserIcon.css";

import userIconImageSrc from "../../images/errorImage.png";

const sizesMap = {
    medium: "40px",
    large: "60px",
    xLarge: "70px",
};

const UserIcon = ({size, colour}) => {

    const dimensions = sizesMap[size];

    return (
        <div className="user-icon" style={{height: dimensions, width: dimensions, backgroundColor: colour}}>
            <img src={userIconImageSrc} alt="user-icon" loading="lazy"/>
        </div>
    );
};

export default UserIcon;