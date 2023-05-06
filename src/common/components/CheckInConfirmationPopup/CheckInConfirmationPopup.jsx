// import "./CheckInConfirmationPopup.css";
// import {
//     addRestaurantCheckIn,
//     checkInExists,
//     getLastCheckInToRestaurantByUserId,
//     removeRestaurantCheckIn
// } from "../../../firebase/firebase";
// import {selectFriends, selectUserId,} from "../../../features/user/userSlice";
// import {useSelector} from "react-redux";
// import {useEffect, useState} from "react";
// import FormField from "../FormField/FormField";
// import {faCircleCheck as solidCircleCheck, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
// import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import UserIcon from "../UserIcon/UserIcon";
// import PrimaryButton from "../PrimaryButton/PrimaryButton";
// import InversePrimaryButton from "../InversePrimaryButton/InversePrimaryButton";
// import InteractionButton from "../InteractionButton/InteractionButton";
//
// const CheckInConfirmationPopup = ({restaurant, checkedIn, closePopup, confirmCheckIn, feedback}) => {
//
//     const userId = useSelector(selectUserId);
//     const friends = useSelector(selectFriends);
//
//     const [lastCheckIn, setLastCheckIn] = useState(null);
//     const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split("T")[0]);
//     const [selectFriendsIsVisible, setSelectFriendIsVisible] = useState(false);
//     const [selectedFriends, setSelectedFriends] = useState([]);
//     const [addFriendsButtonText, setAddFriendsButtonText] = useState("Add friends");
//
//     useEffect(() => {
//         if (!restaurant || !userId) return;
//
//         getLastCheckInToRestaurantByUserId(userId, restaurant.id)
//             .then(data => setLastCheckIn(data));
//     }, [restaurant, userId]);
//
//     return (
//
//     );
// };
//
// export default CheckInConfirmationPopup;