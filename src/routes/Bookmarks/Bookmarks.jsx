import "./Bookmarks.css";
import {useSelector} from "react-redux";
import {selectBookmarks, selectUserId} from "../../features/user/userSlice";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const Bookmarks = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);
    const userBookmarks = useSelector(selectBookmarks);

    useEffect(() => {
        if (!userId) {
            navigate("/profile");
        }
    }, [userId]);

    const handleBackClick = () => {
        navigate("/profile");
    };

    return (
        <div className="bookmarks-container container">
            <header>
                <button onClick={handleBackClick}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                    Back
                </button>

                <h1>Bookmarks</h1>

                <button  style={{visibility: "hidden"}}>
                    <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                    Back
                </button>
            </header>
        </div>
    );
};

export default Bookmarks;