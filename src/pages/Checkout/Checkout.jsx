import React from "react";
import { useBkash } from "react-bkash";

const Checkout = () => {
  const { error, loading, triggerBkash } = useBkash({
    onSuccess: (data) => {
      console.log("Payment successful:", data);
    },
    onClose: () => {
      console.log("bKash iFrame closed");
    },
    bkashScriptURL:
      "https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js",
    amount: 9.99, // Subscription amount
    onCreatePayment: async (paymentRequest) => {
      // Mocking backend response for createPayment
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            paymentID: "TEST_PAYMENT_ID",
            createTime: new Date().toISOString(),
            orgLogo: "https://your-logo-url.com/logo.png",
            orgName: "Your Organization Name",
            transactionStatus: "Initiated",
            amount: paymentRequest.amount,
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: "INV123456",
          });
        }, 1000);
      });
    },
    onExecutePayment: async (paymentID) => {
      // Mocking backend response for executePayment
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            paymentID: paymentID,
            transactionStatus: "Completed",
            amount: "9.99",
            currency: "BDT",
            bkashTrxID: "TRX123456789",
            paymentExecuteTime: new Date().toISOString(),
            merchantInvoiceNumber: "INV123456",
          });
        }, 1000); // Simulate network delay
      });
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 flex justify-center gap-10">
      <div className="flex-1">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">SMCARS</h1>
        </header>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
          <p>Plan: Premium</p>
          <p>Price: 9.99 BDT/month</p>
        </section>
      </div>
      <div>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Billing Address"
              className="w-full p-3 border border-gray-300 rounded"
            />
          </form>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <button
            onClick={triggerBkash}
            className="w-full bg-pink-500 text-white p-3 rounded"
          >
            Pay with bKash
          </button>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
