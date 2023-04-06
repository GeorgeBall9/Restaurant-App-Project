import "./EditProfilePage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faChevronLeft, faCircleCheck, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectChangeIconPopupIsVisible, showChangeIconPopup} from "../../features/changeIconPopup/changeIconPopupSlice";
import ChangeIconPopup from "../../features/changeIconPopup/ChangeIconPopup/ChangeIconPopup";
import {selectDisplayName, selectIconColour, selectUserId, setDisplayName} from "../../features/user/userSlice";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {signOutAuthUser, updateUserDisplayName} from "../../firebase/firebase";

const EditProfilePage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const currentDisplayName = useSelector(selectDisplayName);
    const iconColour = useSelector(selectIconColour);

    const [name, setName] = useState("");
    const [saveButtonStyle, setSaveButtonStyle] = useState({visibility: "hidden"});

    useEffect(() => {
        if (!currentDisplayName) return;

        setName(currentDisplayName);
    }, [currentDisplayName]);

    const setSaveButtonVisibility = (visibility) => {
        setSaveButtonStyle(saveButtonStyle => {
            const updatedStyle = {...saveButtonStyle};
            updatedStyle.visibility = visibility;
            return updatedStyle;
        });
    };

    useEffect(() => {
        if (!currentDisplayName) return;

        if (name === currentDisplayName) {
            setSaveButtonVisibility("hidden");
        } else {
            setSaveButtonVisibility("visible");
        }
    }, [currentDisplayName, name]);

    const handleBackClick = () => {
        navigate("/");
    };

    const handleSaveClick = async () => {
        // update user doc to have new display name
        await updateUserDisplayName(userId, name);
        dispatch(setDisplayName(name));
    };

    const handleDisplayNameChange = ({target}) => {
        const {value} = target;
        setName(value);
    };

    const handleSignOutClick = async () => {
        // sign out user
        await signOutAuthUser();
    };

    const popupVisible = useSelector(selectChangeIconPopupIsVisible);

    const handleChangeIconClick = () => {
        dispatch(showChangeIconPopup());
    };

    return (
        <div className="profile-container container">
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faChevronLeft}/>
                </button>

                <h1>Edit Profile</h1>

                <button onClick={handleSaveClick} style={saveButtonStyle}>
                    <FontAwesomeIcon className="icon" icon={faCircleCheck}/>
                </button>
            </header>

            <section className="change-icon-section">
                <UserIcon size="xLarge" colour={iconColour}/>

                <button onClick={handleChangeIconClick}>
                    Change icon
                    <FontAwesomeIcon className="icon" icon={faPenToSquare}/>
                </button>

                {popupVisible && <ChangeIconPopup/>}
            </section>

            <section className="change-details-section">
                <label>
                    Display name
                    <input type="text" value={name} onChange={handleDisplayNameChange}/>
                </label>
            </section>

            <button className="sign-out-button" onClick={handleSignOutClick}>
                <FontAwesomeIcon className="icon" icon={faArrowRightFromBracket}/>
                Sign out
            </button>
        </div>
    );
};

export default EditProfilePage;