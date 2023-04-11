import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserId} from "../../features/user/userSlice";
import {useEffect} from "react";

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