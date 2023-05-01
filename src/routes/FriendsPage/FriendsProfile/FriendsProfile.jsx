import './FriendsProfile.css';

import FriendContributionsButton from './FriendContributionsButton/FriendContributionsButton';
import {getUserFromUserId} from '../../../firebase/firebase';
import {Link, useNavigate, useParams} from "react-router-dom";
import UserIcon from '../../../common/components/UserIcon/UserIcon';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faComment, faCopy,
    faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import ProfileNavigation from "../../../common/components/ProfileNavigation/ProfileNavigation";

const FriendsProfile = () => {

    const navigate = useNavigate();

    const {userId} = useParams();

    const [idCopied, setIdCopied] = useState(false);
    const [friendProfile, setFriendProfile] = useState(null);

    useEffect(() => {
        if (!userId) return;

        getUserFromUserId(userId)
            .then(user => setFriendProfile(user));
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
            {friendProfile && (
                <>
                    <ProfileNavigation pageTitle={`${friendProfile.displayName}'s Profile`}/>

                    <main className="container">
                        <section className="friends-profile-info-container">
                            <div className="user-icon-container">
                                <UserIcon
                                    size="xLarge"
                                    colour={friendProfile.iconColour}
                                    skeleton={!friendProfile.iconColour && !friendProfile.profilePhotoUrl}
                                    imageUrl={friendProfile.profilePhotoUrl}
                                />
                            </div>

                            <p
                                style={{visibility: friendProfile.displayName ? "visible" : "hidden"}}
                            >
                                {friendProfile.displayName || "display name"}
                            </p>

                            <button className="copy-id-button" onClick={handleCopyIdClick}>
                                {idCopied ? "Copied" : "Copy user ID"}
                                <FontAwesomeIcon className="icon" icon={idCopied ? faCircleCheck : faCopy}/>
                            </button>
                        </section>

                        <section className="contributions-container">
                            <FriendContributionsButton
                                userId={userId}
                                route="/view-check-ins/:userId"
                                icon={faCircleCheck}
                                name="Check ins"
                            />

                            <FriendContributionsButton
                                userId={userId}
                                route="/view-reviews/:userId"
                                icon={faComment}
                                name="Reviews"
                            />
                        </section>

                        <section className="options-container">
                            <Link to={`/view-friends/${userId}`}>
                                <FontAwesomeIcon className="icon" icon={faUserGroup}/>
                                Friends
                            </Link>
                        </section>
                    </main>
                </>
            )}
        </div>
    );
};

export default FriendsProfile;