import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
    userPosition: {
        latitude: 54.971860,
        longitude: -1.599240
    },
    restaurantDisplayed: null,
    route: {
        coordinates: null,
        status: "idle", // idle, pending, success, fail
        error: null
    }
};

const fetchRouteUrl = "https://api.mapbox.com/directions/v5/mapbox/walking/";

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
        return await response.json();
    }
);

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        displayRestaurant: (state, action) => {
            state.restaurantDisplayed = action.payload;
        },
        resetDisplayedRestaurant: state => {
            state.restaurantDisplayed = null;
            state.route.coordinates = null;
            state.route.status = "idle";
            state.route.error = null;
        },
        setRouteCoordinates: (state, action) => {
            state.routeCoordinates = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchRoute.pending, (state, action) => {
                state.route.status = "pending";
            })
            .addCase(fetchRoute.fulfilled, (state, action) => {
                state.route.status = "success";
                state.route.coordinates = action.payload.routes[0].geometry.coordinates;
            })
            .addCase(fetchRoute.rejected, (state, action) => {
                state.route.status = "fail";
                state.route.error = action.error.message;
            })
    }
});

export const {displayRestaurant, resetDisplayedRestaurant, setRouteCoordinates} = mapSlice.actions;
export const selectUserPosition = state => state.map.userPosition;
export const selectDisplayedRestaurant = state => state.map.restaurantDisplayed;
export const selectRouteCoordinates = state => state.map.route.coordinates;
export default mapSlice.reducer