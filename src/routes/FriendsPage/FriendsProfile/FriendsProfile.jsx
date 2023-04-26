import './FriendsProfile.css';

import { getUserFromUserId } from '../../../firebase/firebase';
import { Link, useNavigate, useParams } from "react-router-dom";
import UserIcon from '../../../common/components/UserIcon/UserIcon';
import { useSelector } from "react-redux";
import { selectFriends, selectUserId, selectDisplayName, selectIconColour } from '../../../features/user/userSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { useEffect, useState } from "react";
import ContributionsButton from '../../ProfilePage/ContributionsButton/ContributionsButton';

const FriendsProfile = () => {

    const navigate = useNavigate();

    const { userId } = useParams();

    const [idCopied, setIdCopied] = useState(false);
    const [friendProfile, setFriendProfile] = useState("");

    useEffect(() => {
        if (!userId) return;

        const fetchFriendProfile = async () => {
            const user = await getUserFromUserId(userId);
            setFriendProfile(user);
        };

        fetchFriendProfile();
    }, [userId]);

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
                        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                        Back
                    </button>

                    <h1>{friendProfile.displayName}'s Profile</h1>

                    <button style={{ visibility: "hidden" }}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                        Back
                    </button>
                </div>
            </header>

            <main className="container">
                <section className="friends-profile-info-container">
                    <div className="user-icon-container">
                        <UserIcon size="xLarge" colour={friendProfile.iconColour} skeleton={!friendProfile.iconColour} />
                    </div>

                    <p style={{ visibility: friendProfile.displayName ? "visible" : "hidden" }}>{friendProfile.displayName || "display name"}</p>

                    <button className="copy-id-button" onClick={handleCopyIdClick}>
                        {idCopied ? "Copied" : "Copy user ID"}
                        <FontAwesomeIcon className="icon" icon={idCopied ? faCircleCheck : faCopy} />
                    </button>
                </section>

                <section className="contributions-container">
                    <ContributionsButton route="/view-check-ins/:userId" icon={faCircleCheck} name="Check ins" />

                    <ContributionsButton route="/view-reviews/:userId" icon={faComment} name="Reviews" />
                </section>
            </main>
        </div>
    );
};

export default FriendsProfile;