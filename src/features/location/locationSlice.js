import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userPosition: {
        latitude: 54.972,
        longitude: -1.605
    },
    locationDescription: "Newcastle upon Tyne",
    usingCurrentLocation: false,
    locationOptionsOpen: false,
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
        toggleLocationOptions: state => {
            state.locationOptionsOpen = !state.locationOptionsOpen;
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
    toggleLocationOptions
} = locationSlice.actions
export const selectUserPosition = state => state.location.userPosition;
export const selectLocationDescription = state => state.location.locationDescription;
export const selectUsingCurrentLocation = state => state.location.usingCurrentLocation;
export const selectLocationOptionsOpen = state => state.location.locationOptionsOpen;
export default locationSlice.reducer