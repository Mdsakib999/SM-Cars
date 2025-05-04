import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, clearUser } from "./authSlice";
import { getAuth, signInWithCustomToken } from "firebase/auth";

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
  tagTypes: ["SellerCars", "Cars", "Subscriptions", "Auction"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/users/signup",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const { token: customToken, user: userData } = response.data;

          // Firebase authentication flow
          const auth = getAuth();
          const userCredential = await signInWithCustomToken(auth, customToken);
          const idToken = await userCredential.user.getIdToken(true);

          // Dispatch user to Redux store
          dispatch(
            setUser({
              user: {
                _id: userData._id,
                email: userData.email,
                name: userData.name,
                role: userData.role,
                subscription: userData.subscription,
                uid: userData.uid,
              },
              token: idToken,
            })
          );
        } catch (error) {
          console.error("Signup error:", error);
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [],
      keepUnusedDataFor: 0,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
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

    //
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/users/send-message",
        method: "POST",
        body: messageData,
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
    submitVerification: builder.mutation({
      query: (payload) => ({
        url: `/users/submit-verification`,
        method: "PATCH",
        body: payload,
      }),
    }),
    // Buyer
    // Get All Auction Cars
    getAllAuctionCars: builder.query({
      query: () => `/buyer/auction-cars`,
    }),
    getAuctionCarDetails: builder.query({
      query: (carId) => `/buyer/auction-cars/${carId}`,
      providesTags: (result, error, carId) => [{ type: "Auction", id: carId }],
    }),
    getBiddedCars: builder.query({
      query: (carId) => `/buyer/bidded-cars`,
      invalidatesTags: (result, error, { carId }) => [
        { type: "Auction", id: carId },
      ],
    }),
    getBuyerLimit: builder.query({
      query: (userId) => `/buyer/check-bid-limit/${userId}`,
      providesTags: (result, error, userId) => [
        { type: "BuyerLimit", id: userId },
      ],
    }),

    placeBid: builder.mutation({
      query: ({ carId, auctionId, amount }) => ({
        url: `/buyer/place-bid/${carId}`,
        method: "PATCH",
        body: { auctionId, amount },
      }),
      invalidatesTags: (result, error, { carId }) => [
        { type: "Auction", id: carId },
      ],
      invalidatesTags: (result, error, { userId }) => [
        { type: "BuyerLimit", id: userId },
      ],
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
      invalidatesTags: ["SellerCars"],
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
      invalidatesTags: (result, error, carId) => [
        { type: "SellerCars", id: carId }, // Invalidate specific car
        "SellerCars", // Invalidate entire seller's list
        "Cars", // Invalidate admin's car list
      ],
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
    getMessages: builder.query({
      query: () => "/admin/messages",
    }),

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
    createAuctionAdmin: builder.mutation({
      query: (auctionData) => ({
        url: "/admin/create-auction",
        method: "POST",
        body: auctionData,
      }),
      invalidatesTags: ["Cars"],
    }),
    getAllUsers: builder.query({
      query: () => "/admin/all-users",
    }),
    getBannedUsers: builder.query({
      query: () => "/admin/banned-users",
    }),
    getSingleUser: builder.query({
      query: (userId) => `/admin/user-details/${userId}`,
    }),

    verifyUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/verify-user/${userId}`,
        method: "PATCH",
      }),
    }),
    banUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/ban-user/${userId}`,
        method: "PATCH",
      }),
    }),

    deleteCar: builder.mutation({
      query: (carId) => ({
        url: `/admin/delete-car/`,
        method: "DELETE",
        body: carId,
      }),
    }),
    getAllCars: builder.query({
      query: () => "/admin/allCars",
      providesTags: ["Cars"],
    }),
    getApprovedCars: builder.query({
      query: () => "/admin/get-approved-cars",
      providesTags: ["Cars"],
    }),
    getAdminCarDetails: builder.query({
      query: (id) => `/admin/listing/${id}`,
    }),
    // auction detail for admin
    getAdminAuctionDetails: builder.query({
      query: (carId) => `/admin/car-auction-details/${carId}`,
      providesTags: (result, error, carId) => [{ type: "Auction", id: carId }],
    }),
    approveCar: builder.mutation({
      query: (carId) => ({
        url: `/admin/approve-car/${carId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, carId) => [
        { type: "SellerCars", id: carId }, // Invalidate specific car
        "SellerCars", // Invalidate entire seller's list
        "Cars", // Invalidate admin's car list
      ],
    }),
    rejectCar: builder.mutation({
      query: (carId) => ({
        url: `/admin/reject-car/${carId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, carId) => [
        { type: "SellerCars", id: carId },
        "SellerCars",
        "Cars",
      ],
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
  useSubmitVerificationMutation,
  useSendMessageMutation,
  // AUCTION CARS
  // BUYER HOOKS
  useGetAllAuctionCarsQuery,
  useGetAuctionCarDetailsQuery,
  useGetBiddedCarsQuery,
  useGetBuyerLimitQuery,
  usePlaceBidMutation,
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
  useGetMessagesQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useCreateAuctionAdminMutation,
  useGetAllUsersQuery,
  useGetBannedUsersQuery,
  useGetSingleUserQuery,
  useGetAllCarsQuery,
  useGetApprovedCarsQuery,
  useVerifyUserMutation,
  useBanUserMutation,

  useGetAdminCarDetailsQuery,
  useGetAdminAuctionDetailsQuery,
  useApproveCarMutation,
  useRejectCarMutation,
  useDeleteCarMutation,
} = apiSlice;
