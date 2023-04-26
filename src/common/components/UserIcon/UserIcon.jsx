import "./UserIcon.css";

import userIconImageSrc from "../../images/errorImage.png";

const sizesMap = {
    small: "40px",
    medium: "50px",
    large: "60px",
    larger: "70px",
    xLarge: "100px",
};

const UserIcon = ({size, colour = "#C23B22", skeleton = false}) => {

    const dimensions = sizesMap[size];
    let backgroundColor = skeleton ? "lightgrey" : colour;

    return (
        <div className="user-icon" style={{height: dimensions, width: dimensions, backgroundColor}}>
            {!skeleton && <img src={userIconImageSrc} alt="user-icon" loading="lazy"/>}
        </div>
    );
};

export default UserIcon;