import "./UserIcon.css";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

const sizesMap = {
    small: "40px",
    medium: "50px",
    large: "60px",
    larger: "70px",
    xLarge: "100px",
};

const UserIcon = ({size, imageUrl = null}) => {

    const [imageIsLoaded, setImageIsLoaded] = useState(false);

    const dimensions = sizesMap[size];

    return (
        <div className="user-icon" style={{height: dimensions, width: dimensions}}>
            {imageUrl ? (
                <img
                    className={imageUrl ? "custom-image" : "avatar"}
                    src={imageUrl}
                    alt="user-icon"
                    loading="lazy"
                    onLoad={() => setImageIsLoaded(true)}
                    style={{visibility: imageIsLoaded ? "visible" : "hidden"}}
                />
            ) : (
                <FontAwesomeIcon className="icon" icon={faUser}/>
            )}
        </div>
    );
};

export default UserIcon;