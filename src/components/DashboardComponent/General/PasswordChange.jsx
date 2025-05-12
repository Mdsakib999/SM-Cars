import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "@/provider/AuthProvider";

const PasswordChange = ({ onCancel }) => {
  const { updatePassword } = useContext(AuthContext);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const formik = useFormik({
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
    onSubmit: async (values, { resetForm }) => {
      setIsChangingPassword(true);
      try {
        await updatePassword(values.currentPassword, values.newPassword);
        alert("Password changed successfully!");
        resetForm();
        onCancel();
      } catch (error) {
        console.error("Password change failed:", error);
        alert("Failed to change password. Please try again.");
      } finally {
        setIsChangingPassword(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-4">
      <div className="space-y-4">
        {/* Current */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            {...formik.getFieldProps("currentPassword")}
            className="mt-2 p-3 w-full rounded-lg border border-gray-300"
            placeholder="Enter current password"
          />
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.currentPassword}
            </div>
          )}
        </div>

        {/* New */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            {...formik.getFieldProps("newPassword")}
            className="mt-2 p-3 w-full rounded-lg border border-gray-300"
            placeholder="Enter new password"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.newPassword}
            </div>
          )}
        </div>

        {/* Confirm */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            {...formik.getFieldProps("confirmPassword")}
            className="mt-2 p-3 w-full rounded-lg border border-gray-300"
            placeholder="Confirm new password"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.confirmPassword}
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
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PasswordChange;
