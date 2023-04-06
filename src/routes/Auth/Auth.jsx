import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId, setUserDetails} from "../../features/user/userSlice";
import {useEffect} from "react";
import {getUserFromUserId} from "../../firebase/firebase";

const Auth = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userId = useSelector(selectUserId);

    const storeUserDetails = async (id) => {
        const userDetails = await getUserFromUserId(id);
        dispatch(setUserDetails(userDetails));
    };

    useEffect(() => {
        if (userId) {
            storeUserDetails(userId)
                .then(() => navigate("edit-profile"));
        } else {
            navigate("sign-in");
        }
    }, [userId]);

    return (
        <>
            <Outlet/>
        </>
    );
};

export default Auth;