import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUserId, setUserDetails} from "../../features/user/userSlice";
import {useEffect} from "react";
import {getUserFromUserId} from "../../firebase/firebase";

const Auth = () => {

    const navigate = useNavigate();

    const userId = useSelector(selectUserId);

    useEffect(() => {
        navigate(userId ? "/profile" : "/sign-in");
    }, [userId]);

    return (
        <>
            <Outlet/>
        </>
    );
};

export default Auth;