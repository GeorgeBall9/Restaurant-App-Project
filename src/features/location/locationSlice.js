import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userPosition: {
        latitude: localStorage.getItem("latitude") ?
            JSON.parse(localStorage.getItem("latitude"))
            :
            54.972,
        longitude: localStorage.getItem("longitude") ?
            JSON.parse(localStorage.getItem("longitude"))
            :
            -1.605
    },
    locationDescription: localStorage.getItem("locationDescription") ?
        JSON.parse(localStorage.getItem("locationDescription"))
        :
        "Newcastle upon Tyne",
    usingCurrentLocation: false
};

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        updateUserPosition: (state, action) => {
            const {longitude, latitude} = action.payload;
            state.userPosition.longitude = longitude;
            state.userPosition.latitude = latitude;
        },
        setLocationDescription: (state, action) => {
            state.locationDescription = action.payload;
        },
        setUsingCurrentLocation: state => {
            state.usingCurrentLocation = true;
            state.locationDescription = "Current location";
        },
        setUsingCustomLocation: state => {
            state.usingCurrentLocation = false;
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    updateUserPosition,
    setLocationDescription,
    setUsingCurrentLocation,
    setUsingCustomLocation,
} = locationSlice.actions
export const selectUserPosition = state => state.location.userPosition;
export const selectLocationDescription = state => state.location.locationDescription;
export const selectUsingCurrentLocation = state => state.location.usingCurrentLocation;
export default locationSlice.reducer