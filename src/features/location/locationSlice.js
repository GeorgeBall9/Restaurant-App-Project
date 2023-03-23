import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userPosition: {
        latitude: 54.972,
        longitude: -1.605
    },
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
        toggleLocationOptions: state => {
            state.locationOptionsOpen = !state.locationOptionsOpen;
        }
    }
})

// Action creators are generated for each case reducer function
export const {updateUserPosition, toggleLocationOptions} = locationSlice.actions
export const selectUserPosition = state => state.location.userPosition;
export const selectLocationOptionsOpen = state => state.location.locationOptionsOpen;
export default locationSlice.reducer