import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["SellerCars", "Cars", "Subscriptions", "Auction"],
  endpoints: (builder) => ({
    createUserInDB: builder.mutation({
      query: (payload) => {
        return {
          url: "/users/create-user",
          method: "POST",
          body: payload,
        };
      },
    }),
    getToken: builder.mutation({
      query: (payload) => {
        return {
          url: "/users/get-token",
          method: "POST",
          body: payload,
        };
      },
    }),
    // Message
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/users/send-message",
        method: "POST",
        body: messageData,
      }),
    }),
    // Get User info
    getUserInfo: builder.query({
      query: () => `/users/me/`,
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
    getAllAuctionCars: builder.query({
      query: () => `/buyer/auction-cars`,
      providesTags: (result, error) => [{ type: "Auction" }],
    }),

    getAuctionCarDetails: builder.query({
      query: (auctionId) => `/buyer/auction-cars/${auctionId}`,
      providesTags: (result, error, auctionId) => [
        { type: "Auction", id: auctionId },
      ],
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
      invalidatesTags: (result, error, { auctionId }) => [
        { type: "Auction", id: auctionId },
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
    getAdminAuctionHistory: builder.query({
      query: (carId) => `/admin/car-auction-history/${carId}`,
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
  //test
  useCreateUserInDBMutation,
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
  // auction
  useGetAdminCarDetailsQuery,
  useGetAdminAuctionDetailsQuery,
  useGetAdminAuctionHistoryQuery,
  // car
  useApproveCarMutation,
  useRejectCarMutation,
  useDeleteCarMutation,
} = apiSlice;
