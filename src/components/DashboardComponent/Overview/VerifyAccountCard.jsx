import React from "react";

const VerifyAccountCard = ({ isVerified }) => {
  return (
    <div
      className={` p-6 flex flex-col justify-between rounded-xl bg-white  col-span-1 md:col-span-4 mx-auto px-20 ${
        isVerified ? "border border-green-200" : "border border-red-200"
      }`}
    >
      {/* Title */}
      <h2 className="text-2xl font-medium mb-4 text-center">
        {isVerified ? "Account Verified" : "Verify Your Account"}
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-4 text-center">
        {isVerified
          ? "You're all set! Start uploading cars to sell."
          : "To access all features, please verify your account by signing the agreement."}
      </p>

      {/* Action Button */}
      <button
        className={`px-4 py-2 rounded-lg text-white w-[150px] mx-auto ${
          isVerified
            ? "bg-green-500 hover:bg-green-400"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {isVerified ? "Start Uploading" : "Sign Agreement"}
      </button>
    </div>
  );
};

export default VerifyAccountCard;
