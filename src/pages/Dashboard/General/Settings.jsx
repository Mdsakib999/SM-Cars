import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
} from "@/redux/apiSlice";
import { useSelector } from "react-redux";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Fetch user info
  const {
    data,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useGetUserInfoQuery(user.uid);

  // Mutations for updating profile and changing password
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateUserInfoMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useUpdateUserPasswordMutation();

  // Profile Form
  const profileFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      contact: data?.contact || "",
      presentAddress: data?.presentAddress || "",
      permanentAddress: data?.permanentAddress || "",
      city: data?.city || "",
    },
    validationSchema: Yup.object({
      contact: Yup.string()
        .matches(/^\+?\d{7,15}$/, "Invalid contact number")
        .required("Contact number is required"),
      presentAddress: Yup.string().required("Present address is required"),
      permanentAddress: Yup.string().required("Permanent address is required"),
      city: Yup.string().required("City is required"),
    }),
    onSubmit: async (values) => {
      try {
        await updateProfile({ userId: user._id, ...values }).unwrap();
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Profile update failed:", error);
        alert("Failed to update profile. Please try again.");
      }
    },
  });

  // Password Form
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await changePassword({ userId: user._id, ...values }).unwrap();
        alert("Password changed successfully!");
        passwordFormik.resetForm();
        setShowPasswordForm(false); // Hide password form after successful change
      } catch (error) {
        console.error("Password change failed:", error);
        alert("Failed to change password. Please try again.");
      }
    },
  });

  // Show loader or error if necessary
  if (isUserLoading) return <div>Loading user info...</div>;
  if (isUserError)
    return (
      <div>
        Error loading user info:{" "}
        {userError?.data?.message || userError?.message || "Unknown error"}
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl border w-full max-w-4xl">
        {/* Profile Update Form */}
        <form onSubmit={profileFormik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={data?.name || ""}
                disabled
                className="mt-2 p-3 w-full rounded-lg border border-gray-300 bg-gray-100"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data?.email || ""}
                disabled
                className="mt-2 p-3 w-full rounded-lg border border-gray-300 bg-gray-100"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={profileFormik.values.contact}
                onChange={profileFormik.handleChange}
                onBlur={profileFormik.handleBlur}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />
              {profileFormik.touched.contact &&
                profileFormik.errors.contact && (
                  <div className="text-red-500 text-sm mt-1">
                    {profileFormik.errors.contact}
                  </div>
                )}
            </div>

            {/* Right Column */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Present Address
              </label>
              <input
                type="text"
                name="presentAddress"
                value={profileFormik.values.presentAddress}
                onChange={profileFormik.handleChange}
                onBlur={profileFormik.handleBlur}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />
              {profileFormik.touched.presentAddress &&
                profileFormik.errors.presentAddress && (
                  <div className="text-red-500 text-sm mt-1">
                    {profileFormik.errors.presentAddress}
                  </div>
                )}

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Permanent Address
              </label>
              <input
                type="text"
                name="permanentAddress"
                value={profileFormik.values.permanentAddress}
                onChange={profileFormik.handleChange}
                onBlur={profileFormik.handleBlur}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />
              {profileFormik.touched.permanentAddress &&
                profileFormik.errors.permanentAddress && (
                  <div className="text-red-500 text-sm mt-1">
                    {profileFormik.errors.permanentAddress}
                  </div>
                )}

              <label className="block text-sm font-medium text-gray-700 mt-4">
                City
              </label>
              <input
                type="text"
                name="city"
                value={profileFormik.values.city}
                onChange={profileFormik.handleChange}
                onBlur={profileFormik.handleBlur}
                className="mt-2 p-3 w-full rounded-lg border border-gray-300"
              />
              {profileFormik.touched.city && profileFormik.errors.city && (
                <div className="text-red-500 text-sm mt-1">
                  {profileFormik.errors.city}
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="bg-orange-500 text-white p-3 rounded-lg w-full md:w-1/4"
            >
              {isUpdatingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>

        {/* Password Change Section */}
        <div className="mt-8 border-t pt-6">
          {!showPasswordForm ? (
            <button
              type="button"
              onClick={() => setShowPasswordForm(true)}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={passwordFormik.handleSubmit} className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordFormik.values.currentPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300"
                    placeholder="Enter current password"
                  />
                  {passwordFormik.touched.currentPassword &&
                    passwordFormik.errors.currentPassword && (
                      <div className="text-red-500 text-sm mt-1">
                        {passwordFormik.errors.currentPassword}
                      </div>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordFormik.values.newPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300"
                    placeholder="Enter new password"
                  />
                  {passwordFormik.touched.newPassword &&
                    passwordFormik.errors.newPassword && (
                      <div className="text-red-500 text-sm mt-1">
                        {passwordFormik.errors.newPassword}
                      </div>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordFormik.values.confirmPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300"
                    placeholder="Confirm new password"
                  />
                  {passwordFormik.touched.confirmPassword &&
                    passwordFormik.errors.confirmPassword && (
                      <div className="text-red-500 text-sm mt-1">
                        {passwordFormik.errors.confirmPassword}
                      </div>
                    )}
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  {isChangingPassword ? "Saving..." : "Change Password"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
