import Spinner from "../features/spinner/Spinner/Spinner";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSpinnerIsVisible} from "../features/spinner/spinnerSlice";
import useFetchRestaurants from "../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../common/hooks/useFilterRestaurants";
import FiltersDropdown from "../features/filters/FiltersDropdown/FiltersDropdown";
import {selectFiltersAreVisible} from "../features/filters/filtersSlice";
import useInitialiseSlider from "../common/hooks/useInitialiseSlider";

import {onAuthStateChanged} from "firebase/auth";
import {auth, getUserFromUserId} from "../firebase/firebase";
import {useEffect} from "react";
import {resetUserDetails, selectUserId, setUserDetails, setUserId} from "../features/user/userSlice";

const Root = () => {

    const dispatch = useDispatch();

    useFetchRestaurants();
    useFilterRestaurants();
    useInitialiseSlider();

    const spinnerIsVisible = useSelector(selectSpinnerIsVisible);
    const filtersVisible = useSelector(selectFiltersAreVisible);

    const userId = useSelector(selectUserId);

    const storeUserDetails = async (id) => {
        const userDetails = await getUserFromUserId(id);
        console.log(userDetails)
        dispatch(setUserDetails(userDetails));
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

    return (
        <>
            {spinnerIsVisible && <Spinner/>}
            {filtersVisible && <FiltersDropdown/>}
            <Outlet/>
        </>
    );
};

export default Root;