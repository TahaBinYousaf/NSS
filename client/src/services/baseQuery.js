import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "@/store/slice/authSlice";
import config from "@/config/config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const baseQuery = fetchBaseQuery({
  baseUrl: config.SERVER,
  credentials: "include",
  prepareHeaders: headers => {
    headers.set("Access-Control-Allow-Origin", config.CLIENT);
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    const token = Cookies.get("jwt_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

let lastError = null;
let lastErrorTime = 0;

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result;
  try {
    result = await baseQuery(args, api, extraOptions);
    if (result?.error && result?.error?.status === 401) {
      api.dispatch(logout());
    } else if (result.error) {
      throw result;
    }
  } catch (error) {
    const currentTime = Date.now();
    const isSameError = lastError && lastError?.message === error?.error?.data?.message;

    if (!isSameError || currentTime - lastErrorTime > 100) {
      error?.error?.data?.message && toast.error(error?.error?.data?.message);
      lastError = error;
      lastErrorTime = currentTime;
    }
  }
  return result;
};

export default baseQueryWithReauth;
