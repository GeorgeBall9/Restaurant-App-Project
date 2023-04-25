import './FriendsProfile.css';

import FriendInfo from '../FriendCard/FriendInfo/FriendInfo';
import {Link, useNavigate} from "react-router-dom";
import UserIcon from '../../../common/components/UserIcon/UserIcon';
import {useSelector} from "react-redux";
import { selectFriends ,selectUserId, selectDisplayName, selectIconColour } from '../../../features/user/userSlice';
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
import {useEffect, useState} from "react";
import ContributionsButton from '../../ProfilePage/ContributionsButton/ContributionsButton';

const FriendsProfile = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);
    const displayName = useSelector(selectDisplayName);
    const iconColour = useSelector(selectIconColour);

    const [idCopied, setIdCopied] = useState(false);

    useEffect(() => {
        if (!userId) {
            navigate("/sign-in")
        }
    }, []);

    const handleBackClick = () => {
        navigate("/friends");
    };

    const handleCopyIdClick = () => {
        navigator.clipboard.writeText(userId + "")
            .then(() => setIdCopied(true));
    };

    return (
        <div className="friends-profile-page-container">
            <header>
                <div className="container">
                    <button onClick={handleBackClick}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>

                    <h1>{displayName}'s Profile</h1>

                    <button  style={{visibility: "hidden"}}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>
                </div>
            </header>

            <main className="container">
                <section className="friends-profile-info-container">
                    <div className="user-icon-container">
                        <UserIcon size="xLarge" colour={iconColour} skeleton={!iconColour}/>
                    </div>

                    <p style={{visibility: displayName ? "visible" : "hidden"}}>{displayName || "display name"}</p>

                    <button className="copy-id-button" onClick={handleCopyIdClick}>
                        {idCopied ? "Copied" :"Copy user ID"}
                        <FontAwesomeIcon className="icon" icon={idCopied ? faCircleCheck : faCopy}/>
                    </button>
                </section>

                <section className="contributions-container">
                    <ContributionsButton route="/view-check-ins/:userId" icon={faCircleCheck} name="Check ins"/>

                    <ContributionsButton route="/view-reviews/:userId" icon={faComment} name="Reviews"/>
                </section>
            </main>
        </div>
    );
};

export default FriendsProfile;