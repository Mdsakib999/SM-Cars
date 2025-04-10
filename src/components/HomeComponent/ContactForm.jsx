import React, { useState } from "react";
import { useSendMessageMutation } from "@/redux/apiSlice";

const ContactForm = () => {
  const [sendMessage, { isLoading, error, isSuccess }] =
    useSendMessageMutation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    const messageData = {
      name,
      contactNo: phone,
    };

    try {
      await sendMessage(messageData).unwrap();
      setFeedback("Your request has been sent successfully.");

      setName("");
      setPhone("");
    } catch (err) {
      console.error("Failed to send message:", err);

      setFeedback(
        err?.data?.message || "Failed to send message. Please try again."
      );
    }
  };

  return (
    <section className="relative w-full h-[350px] mt-12">
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922.4512217194696!2d91.8140612695338!3d22.360994938988757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd88d0af07d61%3A0xbbf9590c4e77a64d!2sRoad%20No.%201%2C%20Chittagong!5e0!3m2!1sen!2sbd!4v1714885505967!5m2!1sen!2sbd"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Request a Call Card */}
      <div className="absolute top-1/2 left-1/2 lg:left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg border w-[65%] md:w-1/3">
        <h3 className="text-2xl font-semibold text-center mb-4">
          Request a Call
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black border border-black py-2 px-4 rounded-lg hover:bg-black hover:text-white hover:border-white transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Request Call"}
          </button>
          {feedback && (
            <p
              className={`text-center text-sm mt-2 ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {feedback}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
