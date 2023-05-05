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
    updateUserPhoneNumber, updateUserProfile, updateUserProfilePhoto
} from "../../firebase/firebase";
import FormField from "../../common/components/FormField/FormField";
import PrimaryButton from "../../common/components/PrimaryButton/PrimaryButton";
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";
import UploadImagePopup from "../../common/components/UploadImagePopup/UploadImagePopup";

const defaultProfileFields = {
    displayName: "",
    email: "",
    phone: ""
};

const EditProfilePage = () => {

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const displayName = useSelector(selectDisplayName);
    const email = useSelector(selectEmail);
    const phone = useSelector(selectPhone);
    const profilePhotoUrl = useSelector(selectProfilePhotoUrl);

    const [profileFields, setProfileFields] = useState(defaultProfileFields);
    const [uploadImagePopupIsVisible, setUploadImagePopupIsVisible] = useState(false);
    const [buttonText, setButtonText] = useState("Save");
    const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState("");
    const [photoStoragePath, setPhotoStoragePath] = useState("");

    useEffect(() => {
        if (!displayName) return;

        handleChange({target: {name: "displayName", value: displayName}});
    }, [displayName]);

    useEffect(() => {
        if (!email) return;

        handleChange({target: {name: "email", value: email}});
    }, [email]);

    useEffect(() => {
        if (!phone) return;

        handleChange({target: {name: "phone", value: phone}});
    }, [phone]);

    const handleSaveClick = async () => {
        setButtonText("Saving...");

        if (uploadedPhotoUrl && photoStoragePath) {
            await updateUserProfilePhoto(userId, photoStoragePath);
            dispatch(setProfilePhotoUrl(profileFields.profilePhotoUrl));
        }

        await updateUserProfile(userId, profileFields);

        setButtonText("Saved");
    };

    const handleChange = ({target}) => {
        const {name, value} = target;

        setProfileFields(profileFields => {
            const updatedFields = {...profileFields};
            updatedFields[name] = value;
            return updatedFields;
        });

        setButtonText("Save");
    };

    const handleCloseUploadImagePopup = () => {
        setUploadImagePopupIsVisible(false)
        document.querySelector(".file-upload-input").value = "";
    };

    const handleUploadPhotoClick = async (photoUrl, photoStoragePath) => {
        setUploadedPhotoUrl(photoUrl);
        setPhotoStoragePath(photoStoragePath);
        document.querySelector(".file-upload-input").value = "";
        handleCloseUploadImagePopup();
        setButtonText("Save");
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
                       name="displayName"
                       value={profileFields.displayName}
                       onChangeHandler={handleChange}
                   />

                   <FormField
                       label="Email address"
                       type="email"
                       name="email"
                       value={profileFields.email}
                       onChangeHandler={handleChange}
                   />

                   <FormField
                       label="Phone number"
                       type="text"
                       name="phone"
                       value={profileFields.phone}
                       onChangeHandler={handleChange}
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