import "./ProfilePage.css";
import {Link, useNavigate} from "react-router-dom";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {useSelector} from "react-redux";
import {selectDisplayName, selectIconColour, selectUserId} from "../../features/user/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faBookmark,
    faCamera,
    faCircleCheck,
    faCircleQuestion,
    faComment, faCopy, faPen, faPenToSquare,
    faShareNodes,
    faUser, faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import {signOutAuthUser} from "../../firebase/firebase";
import {useEffect} from "react";
import ContributionsButton from "./ContributionsButton/ContributionsButton";

const ProfilePage = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);
    const displayName = useSelector(selectDisplayName);
    const iconColour = useSelector(selectIconColour);

    useEffect(() => {
        if (!userId) {
            navigate("/sign-in")
        }
    }, []);

    const handleBackClick = () => {
        navigate("/");
    };

    const handleSignOutClick = async () => {
        await signOutAuthUser();
    };

    return (
        <div className="profile-page-container">
            <header>
                <div className="container">
                    <button onClick={handleBackClick}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>

                    <h1>Profile</h1>

                    <button  style={{visibility: "hidden"}}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>
                </div>
            </header>

            <main className="container">
                <section className="profile-info-container">
                    <div className="user-icon-container">
                        <UserIcon size="xLarge" colour={iconColour} skeleton={!iconColour}/>
                    </div>

                    <p style={{visibility: displayName ? "visible" : "hidden"}}>{displayName || "display name"}</p>

                    <button className="copy-id-button">
                        Copy user ID
                        <FontAwesomeIcon className="icon" icon={faCopy}/>
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

                    <Link to="/edit-profile">
                        <FontAwesomeIcon className="icon" icon={faCamera}/>
                        Photos
                    </Link>

                    <Link to="/friends">
                        <FontAwesomeIcon className="icon" icon={faUserGroup}/>
                        Friends
                    </Link>
                </section>

                <section>
                    <button className="sign-out-button" onClick={handleSignOutClick}>
                        Sign out
                    </button>
                </section>
            </main>
        </div>
    );
};

export default ProfilePage;