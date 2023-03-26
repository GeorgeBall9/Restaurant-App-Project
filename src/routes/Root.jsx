import Spinner from "../features/spinner/Spinner/Spinner";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectSpinnerIsVisible} from "../features/spinner/spinnerSlice";
import useFetchRestaurants from "../common/hooks/useFetchRestaurants";
import useFilterRestaurants from "../common/hooks/useFilterRestaurants";
import FiltersDropdown from "../features/filters/FiltersDropdown/FiltersDropdown";
import {selectFiltersAreVisible} from "../features/filters/filtersSlice";
import useInitialiseSlider from "../common/hooks/useInitialiseSlider";
import {useEffect} from "react";
import {selectRestaurants} from "../features/restaurants/restaurantsSlice";

const Root = () => {

    useFetchRestaurants();
    useFilterRestaurants();
    useInitialiseSlider();

    const spinnerIsVisible = useSelector(selectSpinnerIsVisible);
    const filtersVisible = useSelector(selectFiltersAreVisible);

    const restaurants = useSelector(selectRestaurants);

    // const options = {method: 'GET', headers: {accept: 'application/json'}};

    useEffect(() => {
        fetch('https://api.content.tripadvisor.com/api/v1/location/19769400/photos?' +
            'key=&language=en')
            .then(response => {
                if (!response.ok) {
                    throw new Error("The requested resource is not available.");
                }

                return response.json();
            })
            .then(data => {
                const dataArray = data.data;
                const formattedData = dataArray.reduce((object, entry) => {
                    if (!object.id) {
                        object.id = entry.id;
                    }

                    object.photoUrls.push(entry.images?.original?.url);
                    return object;
                }, {id: null, photoUrls: []});
                console.log(formattedData)
            })
            .catch(err => console.error(err));
    }, [restaurants]);

    return (
        <>
            {spinnerIsVisible && <Spinner/>}
            {filtersVisible && <FiltersDropdown/>}
            <Outlet/>
        </>
    );
};

export default Root;