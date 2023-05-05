import "./ImageAndInfoView.css";
import CheckInButton from "./CheckInButton/CheckInButton";
import StarRating from "../../../common/components/StarRating/StarRating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faPhone} from "@fortawesome/free-solid-svg-icons";
import {forwardRef, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import CheckInConfirmationPopup from "./CheckInConfirmationPopup/CheckInConfirmationPopup";
import {getLastCheckInToRestaurantByUserId} from "../../../firebase/firebase";

const ImageAndInfoView = forwardRef((props, ref) => {

    const {
        id,
        name,
        photoUrl,
        starRating,
        price,
        priceLevel,
        formattedAddress,
        phone,
        isOpen,
        restaurant
    } = props;

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    const [checkInConfirmationIsVisible, setCheckInConfirmationIsVisible] = useState(true);
    const [checkedIn, setCheckedIn] = useState(false);

    useEffect(() => {
        if (!id || !userId) return;

        const today = new Date().toLocaleDateString();

        getLastCheckInToRestaurantByUserId(userId, id)
            .then(data => {
                if (data) {
                    const dateString = new Date(data.date).toLocaleDateString();
                    setCheckedIn(today === dateString);
                } else {
                    setCheckedIn(false);
                }
            });
    }, [id, userId]);

    const handleCheckInClick = () => {
        if (!userId) {
            navigate("/sign-in");
        } else {
            setCheckInConfirmationIsVisible(true);
        }
    };

    return (
        <div className="image-and-info-container">
            {checkInConfirmationIsVisible && (
                <CheckInConfirmationPopup restaurant={restaurant} name={name} checkedIn={checkedIn}/>
            )}

            <div className="backdrop" style={{backgroundImage: `url(${photoUrl})`}}></div>

            <div className="restaurant-info">
                <div className="title-container">
                    <h1 ref={ref}>{name}</h1>

                    <CheckInButton checkedIn={checkedIn} handleClick={handleCheckInClick}/>
                </div>

                <StarRating rating={starRating}/>

                <div className="price">
                    <p>{priceLevel !== null ? priceLevel : price}</p>
                </div>

                <div className="address info">
                    <FontAwesomeIcon icon={faLocationDot} className="icon"/>
                    <p>{formattedAddress}</p>
                </div>

                {phone && (
                    <div className="phone info">
                        <FontAwesomeIcon icon={faPhone} className="icon"/>
                        <p>{phone}</p>
                    </div>
                )}

                <div className="open-status">{isOpen ? 'Open Now' : 'Closed'}</div>

            </div>
        </div>
    );
});

export default ImageAndInfoView;