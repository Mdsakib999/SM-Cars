import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} from "@/redux/apiSlice";
import { AuthContext } from "@/provider/AuthProvider";
import PasswordChange from "@/components/DashboardComponent/General/PasswordChange";

const Settings = () => {
  const { profile } = useContext(AuthContext);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  if (!profile) {
    return <div>Please log in to access your settings.</div>;
  }

  const {
    data,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
    refetch,
  } = useGetUserInfoQuery(profile._id);
  console.log("data", data);

  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateUserInfoMutation();

  // Profile Form
  const profileFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      contact: data?.data?.contact || "",
      presentAddress: data?.data?.presentAddress || "",
      permanentAddress: data?.data?.permanentAddress || "",
      city: data?.data?.city || "",
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
        await updateProfile({ userId: profile._id, ...values }).unwrap();
        alert("Profile updated successfully!");
        refetch();
      } catch (error) {
        console.error("Profile update failed:", error);
        alert("Failed to update profile. Please try again.");
      }
    },
  });

  if (isUserLoading) return <div>Loading user info...</div>;
  if (isUserError)
    return (
      <div>
        Error loading user info:
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
                value={profile?.name || ""}
                disabled
                className="mt-2 p-3 w-full rounded-lg border border-gray-300 bg-gray-100"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile?.email || ""}
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
            <PasswordChange onCancel={() => setShowPasswordForm(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
