/*
Description: restaurantsSlice redux store used to store app state information regarding restaurants
Author: Ryan Henzell-Hill
Contact: ryan.henzell-hill@outlook.com
*/

// dependencies
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// initial state configuration
const initialState = {
    // dummy data for restaurants
    allRestaurants: null,
    restaurantResults: null,
    status: "idle", // idle, pending, success, fail
    error: null
};

// url to fetch restaurants data - held on json server atm - must later be changed to API endpoint
const fetchUrl = "http://localhost:8000/data";

// async function to fetch restaurants data
export const fetchRestaurants = createAsyncThunk(
    "restaurants/fetchRestaurants",
    async () => {
        const response = await fetch(fetchUrl);

        if (!response.ok) {
            throw new Error("The requested resource is not available. Check the URL is correct.");
        }

        return await response.json();
    }
)

/*
Function to filter data return by API
Must remove all entries that do not contain id, name, latitude, longitude, photo Url, distance, cuisine
Must check that all entries have the above fields in the correct format
Must remove all entries with the same location_id
*/
const filterData = (data) => {
    // used to remove duplicate locations
    const locationIds = new Set();

    return data.filter(entry => {
        const keepEntry = entry.location_id && !locationIds.has(entry.location_id) && entry.id && entry.name
            && entry.longitude && entry.latitude && entry.photo?.images?.original?.url && entry.distance
            && entry.cuisine && entry.rating && entry.hours?.week_ranges?.length === 7;

        if (!keepEntry) return false;

        locationIds.add(entry.location_id);

        return keepEntry;
    });
};

/*
Function to format the filtered data from the API
Must include id, name, latitude, longitude, photoUrl, rating, distance, cuisine, hours
Price can be null if it does not exist
Longitude, latitude and rating are provided as strings so must be converted to numbers
Primary cuisine is the first cuisine in list
*/
const formatData = (data) => {
    return data.map(entry => {
        const {
            id,
            name,
            latitude,
            longitude,
            photo,
            distance,
            rating,
            price,
            hours,
            cuisine
        } = entry;

        return {
            id,
            name,
            latitude: +latitude,
            longitude: +longitude,
            photoUrl: photo.images.original.url,
            distance: Math.round(distance * 10) / 10,
            rating: +rating,
            price: price ? price : null,
            hours: formatHours(hours),
            primaryCuisine: cuisine.length > 0 ? cuisine[0].name : null,
            cuisines: cuisine
        };
    });
};

// function to process the data returned by the API by filtering and formatting it
const processData = (data) => {
    const filteredData = filterData(data);
    return formatData(filteredData);
};

// function to format the open hours of restaurant data returned by API
const formatHours = (hours) => {

    if (!hours) return null;

    const {week_ranges: weekRanges} = hours;

    if (!weekRanges || weekRanges.length !== 7) return null;

    return weekRanges.map(range => {
        if (range.length === 0) return "Closed";

        return range
            .map(({open_time, close_time}) => `${formatTime(open_time)} - ${formatTime(close_time)}`)
            .join(', ');
    });
};

// helper function to format a time string to a "hh:mm" format
const formatTime = (time) => {
    if (!time) return "N/A";

    const wrappedTime = time % 1440;
    const hours = Math.floor(wrappedTime / 60);
    const minutes = wrappedTime % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
  
// restaurants slice
export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        filterRestaurantResultsByCuisine: (state, action) => {
            const cuisineFilter = action.payload;

            state.restaurantResults = state.allRestaurants
                .filter(restaurant => cuisineFilter === "Any" || restaurant.cuisines
                .find(cuisine => cuisine.name === cuisineFilter));
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchRestaurants.pending, (state, action) => {
                state.status = "pending"; // indicates fetch request has begun
                state.error = null; // reset error
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.status = "success"; // indicates fetch was successful
                const processedData = processData(action.payload);
                state.allRestaurants = processedData; // set restaurants to data returned
                state.restaurantResults = processedData;
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.status = "fail"; // indicates fetch failed
                state.error = action.error.message; // sets error to error message returned
            });
    }
});

export const {filterRestaurantResultsByCuisine} = restaurantsSlice.actions;
export const selectRestaurants = state => state.restaurants.restaurantResults;
export const selectRestaurantsFetchStatus = state => state.restaurants.status;
export default restaurantsSlice.reducer