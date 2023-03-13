import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    restaurants: [
        {
            id: 1,
            name: "21 Restaurant",
            latitude: 54.970486,
            longitude: -1.604618,
            photoUrl: "https://media-cdn.tripadvisor.com/media/photo-o/0d/54/fa/01/restaurant.jpg",
            distance: 0.01,
            rating: 4.5,
            hours: [
                ["12:00-17:00"],
                ["Closed"],
                ["12:00-14:30, 17:30-21:00"],
                ["12:00-14:30, 17:30-21:00"],
                ["12:00-14:30, 17:30-21:00"],
                ["12:00-14:30, 17:30-21:00"],
                ["12:00-14:30, 17:30-22:00"]
            ],
            cuisines: [
                {key: "10654", name: "European"},
                {key: "10662", name: "British"},
                {key: "10665", name: "Vegetarian Friendly"},
                {key: "10697", name: "Vegan Options"},
                {key: "10992", name: "Gluten Free Options"}
            ]
        },
        {
            id: 2,
            name: "Solstice By Kenny Atkinson",
            latitude: 54.96919,
            longitude: -1.6084,
            photoUrl: "https://media-cdn.tripadvisor.com/media/photo-o/25/af/32/d0/logo.jpg",
            distance: 0.31,
            rating: 5.0,
            hours: [
                ["Closed"],
                ["Closed"],
                ["19:00-20:30"],
                ["19:00-20:30"],
                ["19:00-20:30"],
                ["12:00-13:30", "19:00-20:30"],
                ["09:00-20:30"]
            ],
            cuisines: [
                {key: "10662", name: "British"},
                {key: "10669", name: "Contemporary"}
            ]
        },
        {
            id: 3,
            name: "Four Quarters",
            latitude: 54.97072,
            longitude: -1.609997,
            photoUrl: "https://media-cdn.tripadvisor.com/media/photo-m/1280/27/4d/29/bd/craft-beer-cocktails.jpg",
            distance: 0.31,
            rating: 5.0,
            hours: [
                ["12:00-22:00"],
                ["16:00-00:00"],
                ["16:00-00:00"],
                ["16:00-00:00"],
                ["16:00-01:00"],
                ["16:00-02:00"],
                ["16:00-02:00"],
            ],
            cuisines: [
                {key: "10641", name: "Pizza"}
            ]
        },
    ],
};



export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},
    extraReducers: {}
});

export const selectRestaurants = state => state.restaurants.restaurants;
export default restaurantsSlice.reducer