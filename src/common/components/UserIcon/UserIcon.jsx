import "./UserIcon.css";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";

const stylesMap = {
    small: {height: "30px", width: "30px", borderWidth: "2px"},
    medium: {height: "50px", width: "50px", borderWidth: "2px"},
    large: {height: "60px", width: "60px", borderWidth: "3px"},
    larger: {height: "70px", width: "70px", borderWidth: "4px"},
    xLarge: {height: "100px", width: "100px", borderWidth: "5px"},
};

const UserIcon = ({size, imageUrl = null}) => {

    const [imageIsLoaded, setImageIsLoaded] = useState(false);

    const style = stylesMap[size];

    return (
        <div className="user-icon" style={style}>
            {imageUrl ? (
                <img
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