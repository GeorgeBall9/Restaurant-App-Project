import { configureStore } from '@reduxjs/toolkit';

import mapReducer from "../features/map/mapSlice";
import restaurantsReducer from "../features/restaurants/restaurantsSlice"

export default configureStore({
    reducer: {
        map: mapReducer,
        restaurants: restaurantsReducer
    }
});