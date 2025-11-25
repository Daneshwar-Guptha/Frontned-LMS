import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: null
  },
  reducers: {
    updateDetails: (state, action) => {
      state.userData = action.payload;
    }
  }
});

export const { updateDetails } = userSlice.actions;
export const userReducer = userSlice.reducer;
