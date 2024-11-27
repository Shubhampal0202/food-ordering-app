import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
  name: "userAuthSlice",
  initialState: {
    userDetails: null,
  },
  reducers: {
    createUser: (state, action) => {
      state.userDetails = action.payload;
    },
    removeUser: (state) => {
      state.userDetails = null;
    },
  },
});

export const { createUser,removeUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;
