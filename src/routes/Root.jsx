import Spinner from "../features/spinner/Spinner/Spinner";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectSpinnerIsVisible} from "../features/spinner/spinnerSlice";
import useFetchRestaurants from "../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../common/hooks/useFilterRestaurants";
import FiltersDropdown from "../features/filters/FiltersDropdown/FiltersDropdown";
import {selectDropdownFilterVisible} from "../features/filters/filtersSlice";

const Root = () => {

    useFetchRestaurants();
    useFilterRestaurants();

    const spinnerIsVisible = useSelector(selectSpinnerIsVisible);
    const dropdownVisible = useSelector(selectDropdownFilterVisible);

    return (
        <>
            {spinnerIsVisible && <Spinner/>}
            <FiltersDropdown/>
            {dropdownVisible && <FiltersDropdown/>}
            <Outlet/>
        </>
    );
};

export default Root;