import "./ProfilePage.css";
import {Link, useNavigate} from "react-router-dom";
import UserIcon from "../../common/components/UserIcon/UserIcon";
import {useDispatch, useSelector} from "react-redux";
import {selectDisplayName, selectIconColour, selectUserId} from "../../features/user/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faBookmark,
    faCamera,
    faCircleCheck, faCircleQuestion,
    faComment,
    faShareNodes,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {signOutAuthUser} from "../../firebase/firebase";
import {useEffect, useState} from "react";

const ProfilePage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);
    const displayName = useSelector(selectDisplayName);
    const iconColour = useSelector(selectIconColour);

    const handleBackClick = () => {
        navigate("/");
    };

    const handleSignOutClick = async () => {
        await signOutAuthUser();
    };

    const [windowHeight, setWindowHeight] = useState(+window.innerHeight);

    useEffect(() => {
        setWindowHeight(+window.innerHeight)
    }, [window.innerHeight]);

    return (
        <div className="profile-page-container container" style={{minHeight: windowHeight}}>
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                    Back
                </button>

                <h1>Profile</h1>

                <button  style={{visibility: "hidden"}}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                    Back
                </button>
            </header>

            <section className="profile-info-container">
                <div className="user-icon-container">
                    <UserIcon size="xLarge" colour={iconColour}/>
                </div>

                {displayName}
            </section>

            <section>
                <button className="sign-out-button" onClick={handleSignOutClick}>
                    Sign out
                </button>
            </section>

            <section className="options-container">
                <Link to="/edit-profile">
                    <FontAwesomeIcon className="icon" icon={faUser}/>
                    Edit profile
                </Link>

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
        </div>
    );
};

export default ProfilePage;