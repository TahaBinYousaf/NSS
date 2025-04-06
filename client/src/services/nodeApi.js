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
        } catch (error) {
          console.error("Login error:", error);
          toast.error("Login failed");
        }
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
        } catch (error) {
          console.error("Registration error:", error);
          toast.error("Registration failed");
        }
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
        } catch (error) {
          console.error("Forgot password error:", error);
          toast.error("Failed to process request");
        }
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
        } catch (error) {
          console.error("Reset password error:", error);
          toast.error("Failed to reset password");
        }
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
        } catch (error) {
          console.error("Profile update error:", error);
          toast.error("Failed to update profile");
        }
      },
    }),

    /** POSTS */
    createPost: build.mutation({
      query: formData => ({
        method: "POST",
        url: "/post",
        body: formData,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          toast.success(response.data.message);
        } catch (error) {
          console.error("Create post error:", error);
          toast.error("Failed to create post");
        }
      },
    }),

    getPostsByCategory: build.query({
      query: ({ category, limit, option, location, searchQuery }) => {
        console.log("nodeApi - getPostsByCategory called with:", { category, limit, option, location, searchQuery });
        let url = `/post/${category}/${limit}/${option}`;
        
        // Add query parameters
        const params = new URLSearchParams();
        if (location) {
          params.append('location', location);
        }
        if (searchQuery) {
          params.append('searchQuery', searchQuery);
        }
        
        // Add query parameters to URL if any exist
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        console.log("nodeApi - Request URL:", url);
        return {
          method: "GET",
          url,
        };
      },
    }),

    getPostById: build.query({
      query: ({ productid }) => ({
        method: "GET",
        url: `/post/getById/${productid}`,
      }),
    }),

    /** MESSAGES */
    getMessages: build.query({
      query: ({ userId }) => ({
        method: "GET",
        url: `/message/${userId}`,
      }),
    }),

    getConversations: build.query({
      query: () => ({
        method: "GET",
        url: `/message/conversations/all`,
      }),
    }),

    sendMessage: build.mutation({
      query: body => ({
        method: "POST",
        url: "/message",
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          toast.success(response.data.message);
        } catch (error) {
          console.error("Message send error:", error);
          toast.error("Failed to send message");
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotMutation,
  useResetMutation,
  useLazyVerifyResetTokenQuery,
  useChangeProfileMutation,
  useCreatePostMutation,
  useGetPostsByCategoryQuery,
  useGetPostByIdQuery,
  useLazyGetMessagesQuery,
  useGetConversationsQuery,
  useSendMessageMutation,
} = nodeApi;

export default nodeApi;
