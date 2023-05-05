import Spinner from "../features/spinner/Spinner/Spinner";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSpinnerIsVisible} from "../features/spinner/spinnerSlice";
import useFetchRestaurants from "../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../common/hooks/useFilterRestaurants";
import FiltersDropdown from "../features/filters/FiltersDropdown/FiltersDropdown";
import useInitialiseSlider from "../common/hooks/useInitialiseSlider";

import {onAuthStateChanged} from "firebase/auth";
import {auth, getFriendRequestsByUserId, getFriendsByUserId, getUserFromUserId} from "../firebase/firebase";
import {useEffect} from "react";
import {
    resetUserDetails,
    selectUserId,
    setFriendRequests,
    setFriends,
    setUserDetails,
    setUserId
} from "../features/user/userSlice";

const Root = () => {

    const dispatch = useDispatch();

    useFetchRestaurants();
    useFilterRestaurants();
    useInitialiseSlider();

    const spinnerIsVisible = useSelector(selectSpinnerIsVisible);

    const userId = useSelector(selectUserId);

    const storeUserDetails = async (id) => {
        const userDetails = await getUserFromUserId(id);

        if (userDetails) {
            dispatch(setUserDetails(userDetails));
        }

        const friends = await getFriendsByUserId(id);

        if (friends) {
            dispatch(setFriends(friends));
        }

        const friendRequests = await getFriendRequestsByUserId(id);

        if (friendRequests) {
            dispatch(setFriendRequests(friendRequests));
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                dispatch(resetUserDetails());
                localStorage.removeItem("userId");
            } else {
                const userId = user.uid;
                dispatch(setUserId(userId));
                localStorage.setItem("userId", JSON.stringify(userId));
            }
        });
    }, []);

    useEffect(() => {
        if (userId) {
            storeUserDetails(userId);
        }
    }, [userId]);

    useEffect(() => {
        document.body.style.overflow = (spinnerIsVisible) ? "hidden" : "visible";
    }, [spinnerIsVisible]);

    return (
        <>
            {spinnerIsVisible && <Spinner/>}
            <Outlet/>
        </>
    );
};

export default Root;