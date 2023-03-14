/*
Description: mapSlice redux store used to store app state information regarding the map
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// dependencies
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// initial state configuration
const initialState = {
    // user position will be updated when user changes location
    userPosition: {
        latitude: 54.971860,
        longitude: -1.599240
    },
    restaurantDisplayed: null,
    popupDisplayed: false,
    route: {
        coordinates: null,
        travelTime: 0,
        status: "idle", // idle, pending, success, fail
        error: null
    }
};

// url to fetch route data between two markers on the map
const fetchRouteUrl = "https://api.mapbox.com/directions/v5/mapbox/walking/";

// async function to fetch route data
export const fetchRoute = createAsyncThunk(
    "map/fetchRoute",
    async (data) => {
        const {coordinates1, coordinates2} = data;
        const {latitude: lat1, longitude: lon1} = coordinates1;
        const {latitude: lat2, longitude: lon2} = coordinates2;

        const query = fetchRouteUrl + lon1 + "," + lat1 + ";" + lon2 + "," + lat2 +
            "?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&" +
            "access_token=" + process.env.REACT_APP_MAPBOX_TOKEN;

        const response = await fetch(query);

        if (!response.ok) {
            throw new Error("The requested resource is not available. Check the URL is correct.");
        }

        return await response.json();
    }
);

// map slice
export const mapSlice = createSlice({
    name: 'map', // accessed outside of slice using state.map
    initialState,
    reducers: {
        // updates restaurant displayed to restaurant passed in as action payload
        displayRestaurant: (state, action) => {
            state.restaurantDisplayed = action.payload;
        },
        // resets the state of the reducer to the initial state (except user position)
        resetDisplayedRestaurant: state => {
            state.restaurantDisplayed = null;
            state.popupDisplayed = false;
            state.route.coordinates = null;
            state.route.status = "idle";
            state.route.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchRoute.pending, (state, action) => {
                state.route.status = "pending"; // indicates fetch request has begun
                state.route.error = null; // reset error
            })
            .addCase(fetchRoute.fulfilled, (state, action) => {
                state.route.status = "success"; // indicates fetch request was successful

                const route = action.payload.routes[0];
                // sets route coordinates to those obtained from the fetch response
                state.route.coordinates = route.geometry.coordinates;

                // sets route travel time to duration given by fetch response - divided by 60 to give minutes
                state.route.travelTime = route.duration / 60;
            })
            .addCase(fetchRoute.rejected, (state, action) => {
                state.route.status = "fail"; // indicates fetch request was unsuccessful
                state.route.error = action.error.message; // sets error to error message received
            })
    }
});

export const {displayRestaurant, resetDisplayedRestaurant} = mapSlice.actions;
export const selectUserPosition = state => state.map.userPosition;
export const selectDisplayedRestaurant = state => state.map.restaurantDisplayed;
export const selectRouteDetails = state => state.map.route;
export default mapSlice.reducer