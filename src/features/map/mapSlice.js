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
    restaurantDisplayed: null,
    routeCoordinates: [
        [-1.610693, 54.969076],
        [-1.610291, 54.969208],
        [-1.609912, 54.969403],
        [-1.609779, 54.969531],
        [-1.609487, 54.969515],
        [-1.609169, 54.969402],
        [-1.608319, 54.969299],
        [-1.608002, 54.969222],
        [-1.607676, 54.969271],
        [-1.607118, 54.969426],
        [-1.606683, 54.969632],
        [-1.60664, 54.969734],
        [-1.605693, 54.970024],
        [-1.6055, 54.970273],
        [-1.60541, 54.970251],
        [-1.605364, 54.97029],
        [-1.604699, 54.969999],
        [-1.604626, 54.970108],
        [-1.604341, 54.970124],
        [-1.604074, 54.970266],
        [-1.602743, 54.970444],
        [-1.602699, 54.970581]
    ]
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
export const selectRouteCoordinates = state => state.map.routeCoordinates;
export default mapSlice.reducer