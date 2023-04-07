import "./CheckInButton.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck as faSolidCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {addCheckedInRestaurant, selectCheckedInRestaurants} from "../../../features/user/userSlice";
import {useEffect, useState} from "react";

const CheckInButton = ({id}) => {

    const dispatch = useDispatch();

    const checkedInRestaurants = useSelector(selectCheckedInRestaurants);

    const [checkedIn, setCheckedIn] = useState(false);

    useEffect(() => {
        if (!checkedInRestaurants) return;

        setCheckedIn(checkedInRestaurants.includes(id));
    }, [checkedInRestaurants]);

    const handleCheckInClick = () => {
        dispatch(addCheckedInRestaurant(id));
    };

    return (
        <button onClick={handleCheckInClick}>
            {checkedIn ? "Checked in" : "Check in"}
            <FontAwesomeIcon icon={checkedIn ? faSolidCircleCheck : faCircleCheck} className="icon"/>
        </button>
    );
};

export default CheckInButton;