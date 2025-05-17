import React, { useState, useEffect, useContext } from "react";
import {
  useGetUserInfoQuery,
  useSubmitVerificationMutation,
} from "@/redux/apiSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContext } from "@/provider/AuthProvider";

const VerifyAccount = () => {
  const { profile } = useContext(AuthContext);
  const { data, isLoading, isError } = useGetUserInfoQuery(profile._id);
  const [submitVerification, { isLoading: isSubmitting }] =
    useSubmitVerificationMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.contact,
        address: data.presentAddress,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow changes to phone and address
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAgreementChange = () => {
    setAgreementAccepted(!agreementAccepted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreementAccepted) {
      alert("Please accept the terms and conditions to continue.");
      return;
    }
    try {
      // We'll send only the editable fields
      const payload = {
        phone: formData.phone,
        address: formData.address,
      };
      await submitVerification(payload).unwrap();
      setIsSubmitted(true);
      alert(
        "You have successfully submitted your information. Please check your email for the contract."
      );
    } catch (error) {
      console.error("Error submitting verification:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl border max-w-lg mx-auto mt-10 animate-pulse">
        <Skeleton height={32} width={`60%`} className="mb-6" />
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} height={48} className="mb-4" />
        ))}
        <Skeleton height={80} className="mb-4" />
        <Skeleton height={40} width={`100%`} />
      </div>
    );
  }
  if (isError)
    return (
      <div className="text-center py-6 text-red-500">
        Error loading user info
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-xl border max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Verify Your Account
      </h2>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name (read-only) */}
          <div>
            <label className="block text-lg font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
          {/* Agreement Section */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">SMCars Agreement</h3>
            <p className="text-sm text-gray-600 mb-4">
              By signing this agreement, you acknowledge that you have read and
              understood the terms and conditions of SMCars. You agree to comply
              with all policies and standards set forth by SMCars to maintain a
              secure and reliable marketplace for users.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              A copy of the contract will be sent to your email. Please sign the
              document and email it back to us at{" "}
              <a
                href="mailto:support@smcars.com"
                className="text-orange-500 underline ml-1"
              >
                support@smcars.com
              </a>
              .
            </p>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreement"
                checked={agreementAccepted}
                onChange={handleAgreementChange}
                className="w-5 h-5 mr-2 cursor-pointer"
              />
              <label htmlFor="agreement" className="text-sm cursor-pointer">
                I agree to the terms and conditions of SMCars
              </label>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!agreementAccepted || isSubmitting}
            className={`w-full py-2 px-4 rounded-lg text-white transition ${
              agreementAccepted
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Sign Agreement and Submit
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Verification Submitted</h3>
          <p className="text-gray-600">
            Your information has been submitted for verification. Please check
            your email for the contract. Sign it and email it back to us to
            complete the verification process.
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyAccount;
