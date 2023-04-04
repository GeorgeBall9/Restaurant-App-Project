import "./ChangeIconPopup.css";
import {selectIconColour, selectUserId} from "../../user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {hideChangeIconPopup} from "../changeIconPopupSlice";
import UserIcon from "../../../common/components/UserIcon/UserIcon";

const ChangeIconPopup = () => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const iconColour = useSelector(selectIconColour);

    const [iconButtons, setIconButtons] = useState([
        {colour: "#FF2E63", selected: false},
        {colour: "#B3E5BE", selected: false},
        {colour: "#AA77FF", selected: false},
        {colour: "#19A7CE", selected: false},
        {colour: "#FE6244", selected: false},
        {colour: "#FCFFA6", selected: false},
        {colour: "#E6A4B4", selected: false},
        {colour: "#5D9C59", selected: false},
        {colour: "#E21818", selected: false},
    ]);

    useEffect(() => {
        if (!iconColour) return;

        setIconButtons(iconButtons => {
            const updatedIconButtons = [...iconButtons];
            updatedIconButtons.find(button => button.colour === iconColour).selected = true;
            return updatedIconButtons;
        })
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

    const handleSavePopupClick = () => {
        const newIconColour = iconButtons.find(button => button.selected).colour;

        // if (newIconColour !== iconColour) {
        //     updateUserIconColour(userId, newIconColour)
        //         .then(() => {
        //             dispatch(setIconColour(newIconColour));
        //         });
        // }

        handleClosePopupClick();
    };

    return (
        <div className="change-icon-popup">
            <div className="popup-buttons">
                <button onClick={handleClosePopupClick}>Close</button>
                <button onClick={handleResetPopupClick}>Reset</button>
            </div>

            <h2>Choose an icon</h2>

            <div className="icons-container">
                {iconButtons.map((button, i) => (
                    <UserIcon
                        key={i}
                        colour={button.colour}
                        index={i}
                        selected={button.selected}
                        handleClick={handleIconButtonClick}
                    />
                ))}
            </div>

            <button className="apply-button" onClick={handleSavePopupClick}>Save</button>
        </div>
    );
};

export default ChangeIconPopup;