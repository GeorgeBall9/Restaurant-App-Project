import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userPosition: {
        latitude: 54.969048,
        longitude: -1.610672
    },
    restaurantPositions: [
        {
            id: 1,
            latitude: 54.970486,
            longitude: -1.604618
        },
        {
            id: 2,
            latitude: 54.96919,
            longitude: -1.6084
        },
        {
            id: 3,
            latitude: 54.97072,
            longitude: -1.609997
        },
        {
            id: 6,
            latitude: 54.970577,
            longitude: -1.602858
        },
        {
            id: 7,
            latitude: 54.969826,
            longitude: -1.604433
        },
        {
            id: 9,
            latitude: 54.969635,
            longitude: -1.604242
        },
        {
            id: 10,
            latitude: 54.971203,
            longitude: -1.608483
        },
        {
            id: 11,
            latitude: 54.97023,
            longitude: -1.602199
        },
        {
            id: 12,
            latitude: 54.969284,
            longitude: -1.604272
        },
        {
            id: 18,
            latitude: 54.969982,
            longitude: -1.602213
        },
    ],
    restaurantDisplayed: null
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        displayRestaurant: (state, action) => {
            state.restaurantDisplayed = action.payload;
        }
    }
});

export const {displayRestaurant} = mapSlice.actions;
export const selectRestaurantPositions = state => state.map.restaurantPositions;
export const selectUserPosition = state => state.map.userPosition;
export const selectDisplayedRestaurant = state => state.map.restaurantDisplayed;
export default mapSlice.reducer