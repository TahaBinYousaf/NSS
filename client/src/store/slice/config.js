import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authModalType: "",
  currency: "Rs.",
  location: "",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    authModalTypeSet: (state, action) => {
      state.authModalType = action.payload;
    },
    selectLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { authModalTypeSet, selectLocation } = configSlice.actions;

export default configSlice.reducer;
