import "./ProfilePage.css";
import {Link, useNavigate} from "react-router-dom";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {useDispatch, useSelector} from "react-redux";
import {
    resetDisplayedFriend,
    selectDisplayName,
    selectIconColour,
    selectProfilePhotoUrl,
    selectUserId,
    setProfilePhotoUrl
} from "../../features/user/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBookmark,
    faCamera,
    faCircleCheck,
    faComment, faCopy, faPen, faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import {getProfilePhotoUrlByUserId, signOutAuthUser} from "../../firebase/firebase";
import {useEffect, useState} from "react";
import ContributionsButton from "./ContributionsButton/ContributionsButton";
import {hideSpinner} from "../../features/spinner/spinnerSlice";
import PrimaryButton from "../../common/components/PrimaryButton/PrimaryButton";
import ProfileNavigationView from "../../common/components/ProfileNavigationView/ProfileNavigationView";

const ProfilePage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const displayName = useSelector(selectDisplayName);
    const iconColour = useSelector(selectIconColour);
    const profilePhotoUrl = useSelector(selectProfilePhotoUrl);

    const [idCopied, setIdCopied] = useState(false);

    useEffect(() => {
        dispatch(resetDisplayedFriend());

        if (!userId) {
            navigate("/sign-in")
        }

        dispatch(hideSpinner());
    }, []);

    const handleBackClick = () => {
        navigate("/");
    };

    const handleSignOutClick = async () => {
        await signOutAuthUser();
    };

    const handleCopyIdClick = () => {
        navigator.clipboard.writeText(userId + "")
            .then(() => setIdCopied(true));
    };

    return (
        <div className="profile-page-container">
            <ProfileNavigationView pageTitle="Profile" button1={{text: "Home", handler: handleBackClick}}/>

            <main className="container">
                <section className="profile-info-container">
                    <div className="user-icon-container">
                        <UserIcon
                            size="xLarge"
                            imageUrl={profilePhotoUrl}
                        />
                    </div>

                    <p style={{visibility: displayName ? "visible" : "hidden"}}>{displayName || "display name"}</p>

                    <button className="copy-id-button" onClick={handleCopyIdClick}>
                        {idCopied ? "Copied" :"Copy user ID"}
                        <FontAwesomeIcon className="icon" icon={idCopied ? faCircleCheck : faCopy}/>
                    </button>
                </section>

                <section className="contributions-container">
                    <ContributionsButton route="/bookmarks" icon={faBookmark} name="Bookmarks"/>

                    <ContributionsButton route="/check-ins" icon={faCircleCheck} name="Check ins"/>

                    <ContributionsButton route="/preview-reviews" icon={faComment} name="Reviews"/>
                </section>

                <section className="options-container">
                    <Link to="/edit-profile">
                        <FontAwesomeIcon className="icon" icon={faPen}/>
                        Edit profile
                    </Link>

                    <Link to="/photos">
                        <FontAwesomeIcon className="icon" icon={faCamera}/>
                        Photos
                    </Link>

                    <Link to="/friends">
                        <FontAwesomeIcon className="icon" icon={faUserGroup}/>
                        Friends
                    </Link>
                </section>

                <section>
                    <PrimaryButton handleClick={handleSignOutClick} text="Sign out" size="large"/>
                </section>
            </main>
        </div>
    );
};

export default ProfilePage;