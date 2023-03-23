import Spinner from "../features/spinner/Spinner/Spinner";
import {Outlet} from "react-router-dom";

const Root = () => {
    return (
        <>
            <Spinner/>
            <Outlet/>
        </>
    );
};

export default Root;