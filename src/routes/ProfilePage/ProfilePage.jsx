import "./ProfilePage.css";
import {Link} from "react-router-dom";

const ProfilePage = () => {
    return (
        <div className="profile-page-container container">
            Profile page
            <Link to="/edit-profile">Edit</Link>
        </div>
    );
};

export default ProfilePage;