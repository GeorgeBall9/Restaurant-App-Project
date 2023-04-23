import "./FriendsPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCirclePlus, faLink, faMagnifyingGlass, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import UserIcon from "../../common/components/UserIcon/UserIcon";

const FriendsPage = () => {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/profile");
    };

    return (
        <div className="friends-page-container">
            <header>
                <div className="container">
                    <button onClick={handleBackClick}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>

                    <h1>Friends</h1>

                    <button>
                        <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>
                        Search
                    </button>
                </div>
            </header>

            <main className="container">
                <div className="links-container">
                    <button>
                        Add
                        <FontAwesomeIcon className="icon" icon={faPlus}/>
                    </button>

                    <button>
                        Invite
                        <FontAwesomeIcon className="icon" icon={faLink}/>
                    </button>
                </div>

                <div className="friend-icons-container">
                    {[...Array(9)].map(entry => (
                        <div className="friend-icon-container">
                            <UserIcon size="larger"/>

                            <p>username</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FriendsPage;