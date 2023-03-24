import Spinner from "../features/spinner/Spinner/Spinner";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectSpinnerIsVisible} from "../features/spinner/spinnerSlice";
import useFetchRestaurants from "../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../common/hooks/useFilterRestaurants";

const Root = () => {

    useFetchRestaurants();
    useFilterRestaurants();

    const spinnerIsVisible = useSelector(selectSpinnerIsVisible);

    return (
        <>
            {spinnerIsVisible && <Spinner/>}
            <Outlet/>
        </>
    );
};

export default Root;