import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, clearUser } from "./authSlice";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { data } from "autoprefixer";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["SellerCars", "Cars", "Subscriptions"],
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
          const { token: customToken, user: userData } = response.data;

          // Step 1: Sign in with the custom token
          const auth = getAuth();
          const userCredential = await signInWithCustomToken(auth, customToken);

          // Step 2: Get the ID token
          const idToken = await userCredential.user.getIdToken(true); // Force refresh

          // Step 3: Store the ID token (NOT the custom token)
          dispatch(setUser({ user: userData, token: idToken }));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUser());
        } catch (error) {
          console.error("Logout error:", error);
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
    // Get User info
    getUserInfo: builder.query({
      query: (uid) => `/users/me/${uid}`,
    }),
    updateUserInfo: builder.mutation({
      query: (formData) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: formData,
      }),
    }),
    updateUserPassword: builder.mutation({
      query: (formData) => ({
        url: "/users/update-password",
        method: "PUT",
        body: formData,
      }),
    }),

    // Get All Auction Cars
    getAllAuctionCars: builder.query({
      query: () => `/buyer/auction-cars`,
    }),
    // check sellers listing limit
    getSellerLimit: builder.query({
      query: (userId) => `/seller/check-limit/${userId}`,
    }),
    // create car
    createCar: builder.mutation({
      query: (formData) => ({
        url: "/seller/create-car",
        method: "POST",
        body: formData,
      }),
    }),
    editCar: builder.mutation({
      query: ({ id, data }) => ({
        url: `/seller/edit-car/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "SellerCars", id }],
    }),
    // request for approval
    requestCarApproval: builder.mutation({
      query: (carId) => ({
        url: `/seller/request-car-approval/${carId}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "SellerCars", id }],
    }),

    // get seller cars
    getSellerCars: builder.query({
      query: (sellerId) => `seller/my-cars?sellerId=${sellerId}`,
      providesTags: ["SellerCars"],
    }),
    getSellerCarDetails: builder.query({
      query: (id) => `/seller/my-cars/${id}`,
      providesTags: (result, error, id) => [{ type: "SellerCars", id }],
    }),
    // create auction for seller
    createAuction: builder.mutation({
      query: (formData) => ({
        url: `/seller/create-auction`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["SellerCars"],
    }),
    // get user role based subscription plans
    getRoleBasedPlans: builder.query({
      query: (role) => `subscriptions/available?role=${role}`,
    }),
    getUserSubscription: builder.query({
      query: (uid) => `subscriptions/my-subscription?uid=${uid}`,
    }),
    getAllSubscriptions: builder.query({
      query: () => "subscriptions/",
    }),

    //* ADMIN ROUTES: Create, update, delete subscription plans

    createSubscription: builder.mutation({
      query: (subscriptionData) => ({
        url: "/admin/create-sub",
        method: "POST",
        body: subscriptionData,
      }),
    }),
    updateSubscription: builder.mutation({
      query: ({ type, id, updateData }) => ({
        url: `/admin/update-sub/${type}/${id}`,
        method: "PUT",
        body: updateData,
      }),
    }),
    deleteSubscription: builder.mutation({
      query: ({ type, id }) => ({
        url: `/admin/delete-sub/${type}/${id}`,
        method: "DELETE",
      }),
    }),
    getAllCars: builder.query({
      query: () => "/admin/allCars",
      providesTags: ["Cars"],
    }),
    getAdminCarDetails: builder.query({
      query: (id) => `/admin/listing/${id}`,
    }),
    approveCar: builder.mutation({
      query: (carId) => ({
        url: `/admin/approve-car/${carId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cars", "SellerCars"],
    }),
    rejectCar: builder.mutation({
      query: (carId) => ({
        url: `/admin/reject-car/${carId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cars", "SellerCars"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
  // AUCTION CARS
  // BUYER HOOKS
  useGetAllAuctionCarsQuery,

  // SELLER HOOKS
  useCreateCarMutation,
  useEditCarMutation,
  useGetSellerCarsQuery,
  useGetSellerCarDetailsQuery,
  useGetSellerLimitQuery,
  useCreateAuctionMutation,
  useRequestCarApprovalMutation,

  useGetRoleBasedPlansQuery,
  useGetUserSubscriptionQuery,
  useGetAllSubscriptionsQuery,
  // ADMIN HOOKS
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useGetAllCarsQuery,
  useGetAdminCarDetailsQuery,
  useApproveCarMutation,
  useRejectCarMutation,
} = apiSlice;
