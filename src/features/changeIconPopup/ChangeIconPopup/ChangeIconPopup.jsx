import "./ChangeIconPopup.css";
import {selectIconColour, selectUserId, setIconColour} from "../../user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {hideChangeIconPopup} from "../changeIconPopupSlice";
import UserIconButton from "./UserIconButton/UserIconButton";
import {updateUserIconColour} from "../../../firebase/firebase";
import {hideOverlay} from "../../overlay/overlaySlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faImage} from "@fortawesome/free-regular-svg-icons";

const colours = ["#FF2E63", "#B3E5BE", "#AA77FF", "#19A7CE", "#FE6244", "#FFDD83", "#E6A4B4", "#5D9C59", "#E21818"];

const ChangeIconPopup = () => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const iconColour = useSelector(selectIconColour);

    const [iconButtons, setIconButtons] = useState(colours.map(colour => ({colour, selected: false})));
    const [iconType, setIconType] = useState("");
    const [headerText, setHeaderText] = useState("icon type");

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
        handleResetPopupClick();
    };

    const handleResetPopupClick = () => {
        setIconButtons(iconButtons => {
            return [...iconButtons].map(button => {
                button.selected = button.colour === iconColour;
                return button;
            });
        });
    };

    const handleSavePopupClick = async () => {
        const newIconColour = iconButtons.find(button => button.selected).colour;

        if (newIconColour !== iconColour) {
            try {
                await updateUserIconColour(userId, newIconColour);
                dispatch(setIconColour(newIconColour));
            } catch (error) {
                console.error("Error updating user icon colour:", error);
            }
        }

        handleClosePopupClick();
    };

    return (
        <div className="change-icon-popup">
            <div className="popup-buttons">
                <button onClick={handleClosePopupClick}>Close</button>
                <button onClick={handleResetPopupClick}>Reset</button>
            </div>

            <h2>Select an {headerText}</h2>

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

            {iconType && (
                <button className="apply-button" onClick={handleSavePopupClick}>Save</button>
            )}

            <div className="buttons-container">
                <button>
                    <div style={{visibility: "hidden"}}><FontAwesomeIcon className="icon" icon={faUser}/></div>
                    Avatar
                    <div><FontAwesomeIcon className="icon" icon={faUser}/></div>
                </button>

                <button>
                    <div style={{visibility: "hidden"}}><FontAwesomeIcon className="icon" icon={faImage}/></div>
                    Image
                    <div><FontAwesomeIcon className="icon" icon={faImage}/></div>
                </button>
            </div>

            {/*<h2>Choose an icon</h2>*/}

            {/*<div className="icons-container">*/}
            {/*    {iconButtons.map((button, i) => (*/}
            {/*        <UserIconButton*/}
            {/*            key={i}*/}
            {/*            colour={button.colour}*/}
            {/*            index={i}*/}
            {/*            selected={button.selected}*/}
            {/*            handleClick={handleIconButtonClick}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}

            {/*<button className="apply-button" onClick={handleSavePopupClick}>Save</button>*/}
        </div>
    );
};

export default ChangeIconPopup;