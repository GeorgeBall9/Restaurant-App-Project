import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userPosition: {
        latitude: 54.971860,
        longitude: -1.599240
    },
    restaurantDisplayed: null,
    routeCoordinates: null
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        displayRestaurant: (state, action) => {
            state.restaurantDisplayed = action.payload;
        },
        resetDisplayedRestaurant: state => {
            state.restaurantDisplayed = null;
        },
        setRouteCoordinates: (state, action) => {
            state.routeCoordinates = action.payload;
        }
    }
});

export const {displayRestaurant, resetDisplayedRestaurant, setRouteCoordinates} = mapSlice.actions;
export const selectUserPosition = state => state.map.userPosition;
export const selectDisplayedRestaurant = state => state.map.restaurantDisplayed;
export const selectRouteCoordinates = state => state.map.routeCoordinates;
export default mapSlice.reducer