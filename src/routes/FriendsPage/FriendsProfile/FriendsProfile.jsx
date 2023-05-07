import './FriendsProfile.css';

import FriendContributionsButton from './FriendContributionsButton/FriendContributionsButton';
import {useNavigate} from "react-router-dom";
import UserIcon from '../../../common/components/UserIcon/UserIcon';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faComment, faCopy,
    faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import ProfileNavigationView from "../../../common/components/ProfileNavigationView/ProfileNavigationView";
import {useSelector} from "react-redux";
import {selectDisplayedFriend} from "../../../features/user/userSlice";

const FriendsProfile = () => {

    const navigate = useNavigate();

    const displayedFriend = useSelector(selectDisplayedFriend);

    return (
        <div className="friends-profile-page-container">
            {displayedFriend && (
                <>
                    <ProfileNavigationView
                        pageTitle={`${displayedFriend.displayName}'s Profile`}
                        button1={{handler: () => navigate("/friends")}}
                    />

                    <main className="container">
                        <section className="friends-profile-info-container">
                            <div className="user-icon-container">
                                <UserIcon
                                    size="xLarge"
                                    imageUrl={displayedFriend.profilePhotoUrl}
                                />
                            </div>

                            <p
                                style={{visibility: displayedFriend.displayName ? "visible" : "hidden"}}
                            >
                                {displayedFriend.displayName || "display name"}
                            </p>
                        </section>

                        <section className="contributions-container">
                            <FriendContributionsButton
                                userId={displayedFriend.id}
                                route={`/view-friends/${displayedFriend.id}`}
                                icon={faUserGroup}
                                name="Friends"
                            />

                            <FriendContributionsButton
                                userId={displayedFriend.id}
                                route="/view-reviews/:userId"
                                icon={faComment}
                                name="Reviews"
                            />
                        </section>
                    </main>
                </>
            )}
        </div>
    );
};

export default FriendsProfile;