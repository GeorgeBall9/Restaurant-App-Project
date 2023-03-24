import Spinner from "../features/spinner/Spinner/Spinner";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectSpinnerIsVisible} from "../features/spinner/spinnerSlice";
import useFetchRestaurants from "../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../common/hooks/useFilterRestaurants";
import FiltersDropdown from "../features/filters/FiltersDropdown/FiltersDropdown";
import {selectFiltersAreVisible} from "../features/filters/filtersSlice";

const Root = () => {

    useFetchRestaurants();
    useFilterRestaurants();

    const spinnerIsVisible = useSelector(selectSpinnerIsVisible);
    const filtersVisible = useSelector(selectFiltersAreVisible);

    return (
        <>
            {spinnerIsVisible && <Spinner/>}
            {filtersVisible && <FiltersDropdown/>}
            <Outlet/>
        </>
    );
};

export default Root;