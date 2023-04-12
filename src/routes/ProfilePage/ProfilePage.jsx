import "./ProfilePage.css";
import {Link, useNavigate} from "react-router-dom";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {useDispatch, useSelector} from "react-redux";
import {selectDisplayName, selectIconColour, selectUserId} from "../../features/user/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faArrowRightFromBracket,
    faBookmark,
    faCamera,
    faCircleCheck, faCircleQuestion,
    faComment, faRightFromBracket,
    faShareNodes,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {signOutAuthUser} from "../../firebase/firebase";
import {useEffect, useState} from "react";

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
                        <UserIcon size="xLarge" colour={iconColour}/>
                    </div>

                    {displayName}
                </section>

                <section className="contributions-container">
                    <Link to="/bookmarks">
                        <FontAwesomeIcon className="icon" icon={faBookmark}/>
                        Bookmarks
                    </Link>

                    <Link to="/edit-profile">
                        <FontAwesomeIcon className="icon" icon={faCircleCheck}/>
                        Check ins
                    </Link>

                    <Link to="/edit-profile">
                        <FontAwesomeIcon className="icon" icon={faComment}/>
                        Reviews
                    </Link>
                </section>

                <section className="options-container">
                    <Link to="/edit-profile">
                        <FontAwesomeIcon className="icon" icon={faUser}/>
                        Edit profile
                    </Link>

                    <Link to="/edit-profile">
                        <FontAwesomeIcon className="icon" icon={faCamera}/>
                        Photos
                    </Link>

                    <Link to="/edit-profile">
                        <FontAwesomeIcon className="icon" icon={faShareNodes}/>
                        Share
                    </Link>

                    <Link to="/edit-profile">
                        <FontAwesomeIcon className="icon" icon={faCircleQuestion}/>
                        Help
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