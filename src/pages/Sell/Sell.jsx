import React from "react";
import AuthForm from "../../components/AuthForm";

const Buy = () => {
  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat h-[450px] mx-auto"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      ></div>

      {/* AuthForm Section */}
      <div className="flex justify-center items-center -mt-60 px-4">
        <div className="w-full max-w-md">
          <AuthForm defaultRole="seller" />
        </div>
      </div>
    </div>
  );
};

export default Buy;
