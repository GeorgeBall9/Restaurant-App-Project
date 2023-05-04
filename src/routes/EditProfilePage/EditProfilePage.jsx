import "./EditProfilePage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectDisplayName, selectEmail,
    selectPhone, selectProfilePhotoUrl,
    selectUserId,
    setDisplayName, setEmail, setPhone, setProfilePhotoUrl
} from "../../features/user/userSlice";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {
    addPhotoToCheckIn,
    updateUserDisplayName,
    updateUserEmailAddress,
    updateUserPhoneNumber, updateUserProfilePhoto
} from "../../firebase/firebase";
import FormField from "../../common/components/FormField/FormField";
import PrimaryButton from "../../common/components/PrimaryButton/PrimaryButton";
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";
import UploadImagePopup from "../../common/components/UploadImagePopup/UploadImagePopup";

const EditProfilePage = () => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const displayName = useSelector(selectDisplayName);
    const email = useSelector(selectEmail);
    const phone = useSelector(selectPhone);
    const profilePhotoUrl = useSelector(selectProfilePhotoUrl);

    const [name, setName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [uploadImagePopupIsVisible, setUploadImagePopupIsVisible] = useState(false);
    const [buttonText, setButtonText] = useState("Save");
    const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState("");

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

    const handleCloseUploadImagePopup = () => {
        setUploadImagePopupIsVisible(false)
        document.querySelector(".file-upload-input").value = "";
    };

    const handleUploadPhotoClick = async (photoUrl, photoStoragePath) => {
        await updateUserProfilePhoto(userId, photoStoragePath);
        dispatch(setProfilePhotoUrl(photoUrl));
        document.querySelector(".file-upload-input").value = "";
        handleCloseUploadImagePopup();
    };

    return (
        <div className="profile-container">
            <ProfileNavigationView pageTitle="Edit Profile"/>

           <main className="container">
               <section className="change-icon-section">
                   <div className="user-icon-container">
                       <UserIcon
                           size="xLarge"
                           imageUrl={uploadedPhotoUrl || profilePhotoUrl}
                       />

                       <button onClick={() => setUploadImagePopupIsVisible(true)}>
                           <FontAwesomeIcon className="icon" icon={faPenToSquare}/>
                       </button>
                   </div>

                   {uploadImagePopupIsVisible && (
                       <UploadImagePopup
                           handleCloseClick={handleCloseUploadImagePopup}
                           handleUploadClick={handleUploadPhotoClick}
                           shape="round"
                       />
                   )}
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

                   <PrimaryButton
                       handleClick={handleSaveClick}
                       text={buttonText}
                       icon={buttonText === "Saved" ? faCircleCheck : null}
                       size="large"
                   />
               </section>
           </main>
        </div>
    );
};

export default EditProfilePage;