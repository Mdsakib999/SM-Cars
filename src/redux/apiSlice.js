import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      console.log("Current state:", state);
      const token = state.auth?.token;
      const user = state.auth?.user;
      console.log("Token in prepareHeaders:", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/users/signup",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted({ email, password }, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const { user, token } = response.data;
          dispatch(setUser({ user, token }));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    verifyEmail: builder.mutation({
      query: (verificationData) => ({
        url: "/users/verify-email",
        method: "POST",
        body: verificationData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/users/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),
    // create car
    createCar: builder.mutation({
      query: (formData) => ({
        url: "/seller/create-car", // API route for creating a car
        method: "POST",
        body: formData,
      }),
    }),
    // get seller cars
    getSellerCars: builder.query({
      query: (sellerId) => `seller/my-cars?sellerId=${sellerId}`,
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCreateCarMutation,
  useGetSellerCarsQuery,
} = apiSlice;
