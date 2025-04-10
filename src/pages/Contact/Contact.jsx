import React, { useState } from "react";
import { CiPhone, CiLocationOn, CiPaperplane } from "react-icons/ci";
import { useSendMessageMutation } from "@/redux/apiSlice";

const Contact = () => {
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    const messageData = {
      name,
      email,
      contactNo: phone,
      message,
    };

    try {
      await sendMessage(messageData).unwrap();
      setFeedback("Your message was sent successfully!");

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
      setFeedback(
        err?.data?.message || "Failed to send message. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-center mb-8">
          Contact Us
        </h2>

        {/* Contact Information Section */}
        <div className="flex flex-col md:flex-row justify-between items-stretch mb-12 space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex flex-col justify-between border p-6 rounded-lg w-full md:w-1/3 flex-grow">
            <CiPaperplane className="text-5xl text-black mb-4 self-start border p-2 rounded-md bg-gray-100" />
            <div className="mt-auto">
              <p className="text-xl font-semibold">Email us</p>
              <span className="text-md tracking-wider text-gray-500">
                Speak to our friendly team
              </span>
              <p className="text-md tracking-wide mb-4 leading-2">
                smitsolutionbd01@gmail.com
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between border p-6 rounded-lg w-full md:w-1/3 flex-grow">
            <CiPhone className="text-5xl text-black mb-4 self-start border p-2 rounded-md bg-gray-100" />
            <div className="mt-auto">
              <p className="text-xl font-semibold">Call us</p>
              <span className="text-md tracking-wider text-gray-500">
                Speak to our friendly team
              </span>
              <p className="text-md tracking-wide mb-4 leading-2">
                +88 01711646758
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between border p-6 rounded-lg w-full md:w-1/3 flex-grow">
            <CiLocationOn className="text-5xl text-black mb-4 self-start border p-2 rounded-md bg-gray-100" />
            <div className="mt-auto">
              <p className="text-xl font-semibold">Visit us</p>
              <span className="text-md tracking-wider text-gray-500">
                Speak to our friendly team
              </span>
              <p className="text-md tracking-wide mb-2 leading-2">
                <strong>Dhaka Office:</strong> House - NE(B) 2/1, Road- 71,
                Gulshan-02, Dhaka, Bangladesh.
              </p>
              <p className="text-md tracking-wide leading-2">
                <strong>Chittagong Office:</strong> Nasirabad Properties Road 1,
                Chittagong, Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Send a Message Form */}
      <div className="container mx-auto px-4 mb-12">
        <h3 className="text-3xl font-semibold text-center mb-4">
          Send a Message
        </h3>
        <form
          className="space-y-6 mx-4 md:mx-auto max-w-2xl bg-gray-100 p-8 rounded-xl"
          onSubmit={handleSubmit}
        >
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
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your message"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white border border-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
          {feedback && (
            <p
              className={`text-center text-sm mt-2 ${
                feedback.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {feedback}
            </p>
          )}
        </form>
      </div>

      {/* Request a Call Section (Static Google Maps) */}
      <div className="relative w-full h-[350px]">
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922.4512217194696!2d91.8140612695338!3d22.360994938988757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd88d0af07d61%3A0xbbf9590c4e77a64d!2sRoad%20No.%201%2C%20Chittagong!5e0!3m2!1sen!2sbd!4v1714885505967!5m2!1sen!2sbd"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
