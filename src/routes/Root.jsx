import Spinner from "../features/spinner/Spinner/Spinner";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectSpinnerIsVisible} from "../features/spinner/spinnerSlice";

const Root = () => {

    const spinnerIsVisible = useSelector(selectSpinnerIsVisible);

    return (
        <>
            {spinnerIsVisible && <Spinner/>}
            <Outlet/>
        </>
    );
};

export default Root;