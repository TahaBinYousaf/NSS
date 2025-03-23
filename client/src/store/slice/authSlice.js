import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import localStorage from "redux-persist/es/storage";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      localStorage.removeItem("persist:root");
      Cookies.remove("jwt_token");
      return initialState;
    },
    setProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, logout, setProfile } = authSlice.actions;

export default authSlice.reducer;
