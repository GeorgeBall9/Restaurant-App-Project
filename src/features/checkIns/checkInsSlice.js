import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    checkIns: [],
    selectedCheckIns: [],
    selectedCheckIn: {}
};

export const checkInsSlice = createSlice({
    name: 'checkIns',
    initialState,
    reducers: {
        setCheckIns: (state, action) => {
            state.checkIns = action.payload;
        },
        removeCheckIn: (state, action) => {
            state.checkIns = state.checkIns.filter(checkIn => checkIn.id !== action.payload);
        },
        updateCheckIn: (state, action) => {
            const updatedCheckIn = action.payload;

            state.checkIns = state.checkIns
                .map(checkIn => checkIn.id === updatedCheckIn.id ? updatedCheckIn : checkIn);
        },
        setSelectedCheckIns: (state, action) => {
            state.selectedCheckIns = action.payload;
        },
        setSelectedCheckIn: (state, action) => {
            state.selectedCheckIn = action.payload;
        },
    }
})

export const {
    setCheckIns,
    removeCheckIn,
    updateCheckIn,
    setSelectedCheckIns,
    setSelectedCheckIn
} = checkInsSlice.actions;

export const selectCheckIns = state => state.checkIns.checkIns;
export const selectSelectedCheckIns = state => state.checkIns.selectedCheckIns;
export const selectSelectedCheckIn = state => state.checkIns.selectedCheckIn;

export default checkInsSlice.reducer;