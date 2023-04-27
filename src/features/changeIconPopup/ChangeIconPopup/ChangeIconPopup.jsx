import "./ChangeIconPopup.css";
import {selectIconColour, selectUserId, setIconColour, setProfilePhotoUrl} from "../../user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {hideChangeIconPopup} from "../changeIconPopupSlice";
import UserIconButton from "./UserIconButton/UserIconButton";
import {
    updateUserIconColour,
    updateUserProfilePhoto,
    uploadImage
} from "../../../firebase/firebase";
import {hideOverlay} from "../../overlay/overlaySlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faImage} from "@fortawesome/free-regular-svg-icons";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import FormField from "../../../common/components/FormField/FormField";
import UserIcon from "../../../common/components/UserIcon/UserIcon";

const colours = ["#FF2E63", "#B3E5BE", "#AA77FF", "#19A7CE", "#FE6244", "#FFDD83", "#E6A4B4", "#5D9C59", "#E21818"];

const ChangeIconPopup = () => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const iconColour = useSelector(selectIconColour);

    const [iconButtons, setIconButtons] = useState(colours.map(colour => ({colour, selected: false})));
    const [iconType, setIconType] = useState("");
    const [headerText, setHeaderText] = useState("icon type");
    const [photoUrl, setPhotoUrl] = useState("");
    const [photoStorageRef, setPhotoStorageRef] = useState(null);

    useEffect(() => {
        if (!iconColour) return;

        setIconButtons(iconButtons => {
            const updatedIconButtons = [...iconButtons];
            updatedIconButtons.find(button => button.colour === iconColour).selected = true;
            return updatedIconButtons;
        });
    }, [iconColour]);

    const handleIconButtonClick = (index) => {
        setIconButtons(iconButtons => {
            const updatedIconButtons = [...iconButtons].map(button => {
                button.selected = false;
                return button;
            });

            updatedIconButtons[index].selected = true;
            return updatedIconButtons;
        });
    };

    const handleClosePopupClick = () => {
        dispatch(hideOverlay());
        dispatch(hideChangeIconPopup());
        handleResetClick();
    };

    const handleResetClick = () => {
        if (iconType === "avatar") {
            setIconButtons(iconButtons => {
                return [...iconButtons].map(button => {
                    button.selected = button.colour === iconColour;
                    return button;
                });
            });
        } else if (iconType === "image") {
            document.querySelector(".photo-upload-input").value = "";
        }
    };

    const handleSaveClick = async () => {
        if (iconType === "avatar") {
            const newIconColour = iconButtons.find(button => button.selected).colour;

            if (newIconColour !== iconColour) {
                try {
                    await updateUserIconColour(userId, newIconColour);
                    dispatch(setIconColour(newIconColour));
                } catch (error) {
                    console.error("Error updating user icon colour:", error);
                }
            }
        } else if (iconType === "image") {
            try {
                await updateUserProfilePhoto(userId, photoStorageRef);
                dispatch(setProfilePhotoUrl(photoUrl));
            } catch (error) {
                console.error("Error updating user profile photo:", error);
            }
        }

        handleClosePopupClick();
    };

    const handleFileChange = ({target}) => {
        const file = target.files[0];
        const storageRef = uploadImage(file, setPhotoUrl);
        setPhotoStorageRef(storageRef);
    };

    return (
        <div className="change-icon-popup">
            <div className="popup-buttons">
                <button
                    style={{visibility: iconType ? "visible" : "hidden"}}
                    onClick={() => setIconType("")}
                >
                    Back
                </button>

                <button onClick={handleClosePopupClick}>
                    {iconType ? "Close" : <FontAwesomeIcon className="icon" icon={faXmark}/>}
                </button>
            </div>

            <h2>Select an {!iconType ? headerText : iconType}</h2>

            {iconType === "avatar" && (
                <div className="icons-container">
                    {iconButtons.map((button, i) => (
                        <UserIconButton
                            key={i}
                            colour={button.colour}
                            index={i}
                            selected={button.selected}
                            handleClick={handleIconButtonClick}
                        />
                    ))}
                </div>
            )}

            {iconType === "image" && (
                <div>
                    <div className="user-icon-container">
                        <UserIcon size="xLarge" skeleton={!photoUrl} imageUrl={photoUrl}/>
                    </div>

                    <FormField
                        name="file"
                        type="file"
                        onChangeHandler={handleFileChange}
                        className="photo-upload-input"
                    />
                </div>
            )}

            {iconType && (
                <div className="save-reset-buttons">
                    <button className="save-button" onClick={handleSaveClick}>Save</button>
                    <button className="reset-button" onClick={handleResetClick}>Reset</button>
                </div>
            )}

            {!iconType && (
                <div className="select-buttons-container">
                    <button onClick={() => setIconType("avatar")}>
                        <div style={{visibility: "hidden"}}>
                            <FontAwesomeIcon className="icon" icon={faUser}/>
                        </div>

                        Avatar

                        <div>
                            <FontAwesomeIcon className="icon" icon={faUser}/>
                        </div>
                    </button>

                    <button onClick={() => setIconType("image")}>
                        <div style={{visibility: "hidden"}}>
                            <FontAwesomeIcon className="icon" icon={faImage}/>
                        </div>

                        Image

                        <div>
                            <FontAwesomeIcon className="icon" icon={faImage}/>
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChangeIconPopup;