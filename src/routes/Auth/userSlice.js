import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;