import { configureStore } from '@reduxjs/toolkit';

import mapReducer from "../features/map/mapSlice";
import restaurantsReducer from "../features/restaurants/restaurantsSlice"
import filtersReducer from "../features/filters/filtersSlice";
import sliderReducer from "../features/slider/sliderSlice";
import locationReducer from "../features/location/locationSlice";

export default configureStore({
    reducer: {
        map: mapReducer,
        restaurants: restaurantsReducer,
        filters: filtersReducer,
        slider: sliderReducer,
        location: locationReducer,
    }
});