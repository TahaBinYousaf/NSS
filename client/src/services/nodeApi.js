import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/services/baseQuery";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { setProfile, setUser } from "@/store/slice/authSlice";

const nodeApi = createApi({
  baseQuery,
  reducerPath: "nodeApi",
  tagTypes: ["User", "Room", "PackageData"],
  endpoints: build => ({
    login: build.mutation({
      query: body => ({
        method: "POST",
        url: "/auth/login",
        body,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          Cookies.set("jwt_token", response.data.token, {
            secure: true,
          });
          dispatch(setUser(response.data.user));
          toast.success(response.data.message);
        } catch (e) {}
      },
    }),

    register: build.mutation({
      query: body => ({
        method: "POST",
        url: "/auth/register",
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          toast.success(response.data.message);
        } catch (e) {}
      },
    }),

    forgot: build.mutation({
      query: body => ({
        method: "POST",
        url: "/auth/forgot-password",
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          toast.success(response.data.message);
        } catch (e) {}
      },
    }),

    verifyResetToken: build.query({
      query: token => ({
        method: "GET",
        url: "/auth/verify-reset-token",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    reset: build.mutation({
      query: ({ token, password }) => ({
        method: "POST",
        url: "/auth/reset-password",
        body: { password },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          toast.success(response.data.message);
        } catch (e) {}
      },
    }),

    changeProfile: build.mutation({
      query: formData => ({
        method: "PUT",
        url: "/auth/profile",
        body: formData,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(setProfile(response.data.user));
          toast.success(response.data.message);
        } catch (e) {}
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useForgotMutation, useResetMutation, useLazyVerifyResetTokenQuery, useChangeProfileMutation } = nodeApi;

export default nodeApi;
