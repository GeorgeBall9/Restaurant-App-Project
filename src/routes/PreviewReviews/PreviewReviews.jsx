import "./PreviewReviews.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useEffect, useState} from "react";

const PreviewReviews = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        if (!userId) return;


    }, [userId]);

    const handleBackClick = () => {
        navigate("/profile");
    };

    return (
        <div className="preview-reviews-container">
            <header>
                <div className="container">
                    <button onClick={handleBackClick}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>

                    <h1>Reviews</h1>

                    <button  style={{visibility: "hidden"}}>
                        <FontAwesomeIcon className="icon" icon={faArrowLeft}/>
                        Back
                    </button>
                </div>
            </header>
        </div>
    );
};

export default PreviewReviews;