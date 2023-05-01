import './FriendsProfile.css';

import FriendContributionsButton from './FriendContributionsButton/FriendContributionsButton';
import {Link, useNavigate} from "react-router-dom";
import UserIcon from '../../../common/components/UserIcon/UserIcon';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faComment, faCopy,
    faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import ProfileNavigation from "../../../common/components/ProfileNavigation/ProfileNavigation";
import {useSelector} from "react-redux";
import {selectDisplayedFriend} from "../../../features/user/userSlice";

const FriendsProfile = () => {

    const navigate = useNavigate();

    const displayedFriend = useSelector(selectDisplayedFriend);

    const [idCopied, setIdCopied] = useState(false);

    const handleCopyIdClick = () => {
        navigator.clipboard.writeText(displayedFriend.id + "")
            .then(() => setIdCopied(true));
    };

    return (
        <div className="friends-profile-page-container">
            {displayedFriend && (
                <>
                    <ProfileNavigation
                        pageTitle={`${displayedFriend.displayName}'s Profile`}
                        button1={{handler: () => navigate("/friends")}}
                    />

                    <main className="container">
                        <section className="friends-profile-info-container">
                            <div className="user-icon-container">
                                <UserIcon
                                    size="xLarge"
                                    colour={displayedFriend.iconColour}
                                    skeleton={!displayedFriend.iconColour && !displayedFriend.profilePhotoUrl}
                                    imageUrl={displayedFriend.profilePhotoUrl}
                                />
                            </div>

                            <p
                                style={{visibility: displayedFriend.displayName ? "visible" : "hidden"}}
                            >
                                {displayedFriend.displayName || "display name"}
                            </p>

                            <button className="copy-id-button" onClick={handleCopyIdClick}>
                                {idCopied ? "Copied" : "Copy user ID"}
                                <FontAwesomeIcon className="icon" icon={idCopied ? faCircleCheck : faCopy}/>
                            </button>
                        </section>

                        <section className="contributions-container">
                            <FriendContributionsButton
                                userId={displayedFriend.id}
                                route="/view-check-ins/:userId"
                                icon={faCircleCheck}
                                name="Check ins"
                            />

                            <FriendContributionsButton
                                userId={displayedFriend.id}
                                route="/view-reviews/:userId"
                                icon={faComment}
                                name="Reviews"
                            />
                        </section>

                        <section className="options-container">
                            <Link to={`/view-friends/${displayedFriend.id}`}>
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