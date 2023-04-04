import "./UserIcon.css";

import userIconImageSrc from "../../images/errorImage.png";

const sizesMap = {
    medium: "40px",
    large: "60px",
    xLarge: "70px",
};

const UserIcon = ({size, colour}) => {

    const dimensions = sizesMap[size];
    let backgroundColor = colour ? colour : "#C23B22";

    return (
        <div className="user-icon" style={{height: dimensions, width: dimensions, backgroundColor}}>
            <img src={userIconImageSrc} alt="user-icon" loading="lazy"/>
        </div>
    );
};

export default UserIcon;