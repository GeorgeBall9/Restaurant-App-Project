import "./EditProfilePage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faChevronLeft, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectChangeIconPopupIsVisible, showChangeIconPopup} from "../../features/changeIconPopup/changeIconPopupSlice";
import ChangeIconPopup from "../../features/changeIconPopup/ChangeIconPopup/ChangeIconPopup";
import {
    selectDisplayName, selectEmail,
    selectIconColour, selectPhone,
    selectUserId,
    setDisplayName, setEmail, setPhone
} from "../../features/user/userSlice";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {
    updateUserDisplayName,
    updateUserEmailAddress,
    updateUserPhoneNumber
} from "../../firebase/firebase";
import {showOverlay} from "../../features/overlay/overlaySlice";
import FormField from "../../common/components/FormField/FormField";

const EditProfilePage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const displayName = useSelector(selectDisplayName);
    const email = useSelector(selectEmail);
    const phone = useSelector(selectPhone);
    const iconColour = useSelector(selectIconColour);

    const [name, setName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [buttonText, setButtonText] = useState("Save");

    useEffect(() => {
        if (!displayName) return;

        setName(displayName);
    }, [displayName]);

    useEffect(() => {
        if (!email) return;

        setEmailAddress(email);
    }, [email]);

    useEffect(() => {
        if (!phone) return;

        setPhoneNumber(phone);
    }, [phone]);

    const handleBackClick = () => {
        navigate("/profile");
    };

    const handleSaveClick = async () => {
        // update user doc to have new fields
        if (name !== displayName) {
            setButtonText("Saving...");
            await updateUserDisplayName(userId, name);
            dispatch(setDisplayName(name));
            setButtonText("Saved");
        }

        if (emailAddress !== email) {
            setButtonText("Saving...");
            await updateUserEmailAddress(userId, emailAddress);
            dispatch(setEmail(emailAddress));
            setButtonText("Saved");
        }

        if (phoneNumber !== phone) {
            setButtonText("Saving...");
            await updateUserPhoneNumber(userId, phoneNumber);
            dispatch(setPhone(phoneNumber));
            setButtonText("Saved");
        }
    };

    const handleDisplayNameChange = ({target}) => {
        setButtonText("Save");
        const {value} = target;
        setDisplayName(value);
    };

    const handleEmailAddressChange = ({target}) => {
        setButtonText("Save");
        const {value} = target;
        setEmailAddress(value);
    };

    const handlePhoneNumberChange = ({target}) => {
        setButtonText("Save");
        const {value} = target;
        setPhoneNumber(value);
    };

    const popupVisible = useSelector(selectChangeIconPopupIsVisible);

    const handleChangeIconClick = () => {
        dispatch(showOverlay());
        dispatch(showChangeIconPopup());
    };

    const [windowHeight, setWindowHeight] = useState(+window.innerHeight);

    useEffect(() => {
        setWindowHeight(+window.innerHeight)
    }, [window.innerHeight]);

    return (
        <div className="profile-container container" style={{minHeight: windowHeight}}>
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                    Back
                </button>

                <h1>Edit Profile</h1>

                <button style={{visibility: "hidden"}}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                    Back
                </button>
            </header>

           <main>
               <section className="change-icon-section">
                   <div className="user-icon-container">
                       <UserIcon size="xLarge" colour={iconColour}/>

                       <button onClick={handleChangeIconClick}>
                           <FontAwesomeIcon className="icon" icon={faPenToSquare}/>
                       </button>
                   </div>

                   {popupVisible && <ChangeIconPopup/>}
               </section>

               <section className="change-details-section">
                   <FormField
                       label="Display name"
                       type="text"
                       value={name}
                       onChangeHandler={handleDisplayNameChange}
                   />

                   <FormField
                       label="Email address"
                       type="email"
                       value={emailAddress}
                       onChangeHandler={handleEmailAddressChange}
                   />

                   <FormField
                       label="Phone number"
                       type="text"
                       value={phoneNumber}
                       onChangeHandler={handlePhoneNumberChange}
                   />

                   <button onClick={handleSaveClick}>
                       {buttonText}
                       {buttonText === "Saved" && (
                           <FontAwesomeIcon className="icon" icon={faCircleCheck}/>
                       )}
                   </button>
               </section>
           </main>
        </div>
    );
};

export default EditProfilePage;