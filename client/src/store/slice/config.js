import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authModalType: "",
  currency: "Rs.",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    authModalTypeSet: (state, action) => {
      state.authModalType = action.payload;
    },
  },
});

export const { authModalTypeSet } = configSlice.actions;

export default configSlice.reducer;
