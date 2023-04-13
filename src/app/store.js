import { configureStore } from '@reduxjs/toolkit';

import mapReducer from "../features/map/mapSlice";
import restaurantsReducer from "../features/restaurants/restaurantsSlice"
import filtersReducer from "../features/filters/filtersSlice";
import sliderReducer from "../features/slider/sliderSlice";
import locationReducer from "../features/location/locationSlice";
import spinnerReducer from "../features/spinner/spinnerSlice";
import userReducer from "../features/user/userSlice";
import changeIconPopupReducer from "../features/changeIconPopup/changeIconPopupSlice";
import overlayReducer from "../features/overlay/overlaySlice";
import checkInConfirmationReducer from "../features/checkInConfirmation/checkInConfirmationSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";

export default configureStore({
    reducer: {
        map: mapReducer,
        restaurants: restaurantsReducer,
        filters: filtersReducer,
        slider: sliderReducer,
        location: locationReducer,
        spinner: spinnerReducer,
        user: userReducer,
        changeIconPopup: changeIconPopupReducer,
        overlay: overlayReducer,
        checkInConfirmation: checkInConfirmationReducer,
        reviews: reviewsReducer,
    }
});