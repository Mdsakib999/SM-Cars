import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../provider/AuthProvider";
import { useCreateUserInDBMutation } from "@/redux/apiSlice";

const Signup = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [createUserInDB] = useCreateUserInDBMutation();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: "",
      userRole: "buyer",
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      contact: Yup.string()
        .matches(/^[0-9]+$/, "Digits only")
        .required("Contact is required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6).required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
      userRole: Yup.string().oneOf(["buyer", "seller"]).required("Required"),
      termsAccepted: Yup.boolean().oneOf([true], "Must accept"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // 1) Firebase signup
        const cred = await createUser(values.email, values.password);
        // 2) Set displayName
        await updateUserProfile({ name: values.name, photo: "" });
        // 3) Create in your DB
        await createUserInDB({
          email: values.email,
          name: values.name,
          contact: values.contact,
          picture: "",
          role: values.userRole,
        }).unwrap();

        // 4) Show toast, then navigate
        toast.success("Signup successful! Redirecting…", {
          onClose: () => navigate("/dashboard"),
          autoClose: 2000,
        });
      } catch (err) {
        console.error(err);
        toast.error(err?.data?.message || err?.message || "Signup error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-full">
      <ToastContainer />
      <div className="flex-1 p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          {/** Name **/}
          <label>Name</label>
          <input
            {...formik.getFieldProps("name")}
            className="w-full mb-2 p-2 border"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500">{formik.errors.name}</div>
          )}

          {/** Contact **/}
          <label>Contact</label>
          <input
            {...formik.getFieldProps("contact")}
            className="w-full mb-2 p-2 border"
          />
          {formik.touched.contact && formik.errors.contact && (
            <div className="text-red-500">{formik.errors.contact}</div>
          )}

          {/** Email **/}
          <label>Email</label>
          <input
            {...formik.getFieldProps("email")}
            className="w-full mb-2 p-2 border"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}

          {/** Password **/}
          <label>Password</label>
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("password")}
              className="w-full p-2 border"
            />
            <span
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-2 cursor-pointer"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}

          {/** Confirm **/}
          <label>Confirm Password</label>
          <input
            type="password"
            {...formik.getFieldProps("confirmPassword")}
            className="w-full mb-2 p-2 border"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500">{formik.errors.confirmPassword}</div>
          )}

          {/** Role **/}
          <label>Register as</label>
          <div className="flex space-x-2 mb-2">
            {["buyer", "seller"].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => formik.setFieldValue("userRole", r)}
                className={
                  formik.values.userRole === r
                    ? "px-4 py-2 bg-orange-500 text-white"
                    : "px-4 py-2 border"
                }
              >
                {r}
              </button>
            ))}
          </div>
          {formik.touched.userRole && formik.errors.userRole && (
            <div className="text-red-500">{formik.errors.userRole}</div>
          )}

          {/** Terms **/}
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              {...formik.getFieldProps("termsAccepted")}
              className="mr-2"
            />
            I agree to the terms
          </label>
          {formik.touched.termsAccepted && formik.errors.termsAccepted && (
            <div className="text-red-500">{formik.errors.termsAccepted}</div>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-orange-500 text-white py-2 rounded"
          >
            {formik.isSubmitting ? "Signing up…" : "Sign Up"}
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
