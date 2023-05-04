import "./ChangeProfilePhotoPopup.css";
import {selectIconColour, selectUserId} from "../../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    uploadImage
} from "../../../firebase/firebase";

const ChangeProfilePhotoPopup = ({closePopup}) => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const iconColour = useSelector(selectIconColour);

    const [iconType, setIconType] = useState("");
    const [headerText, setHeaderText] = useState("icon type");
    const [photoUrl, setPhotoUrl] = useState("");
    const [photoStoragePath, setPhotoStoragePath] = useState(null);

    const handleFileChange = ({target}) => {
        const file = target.files[0];
        const storageRef = uploadImage(file, setPhotoUrl);
        console.log(storageRef._location.path)
        setPhotoStoragePath(storageRef._location.path);
    };

    return (
        <div className="change-icon-popup"></div>
    );
};

export default ChangeProfilePhotoPopup;