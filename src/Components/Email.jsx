import React from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const service_id = import.meta.env.VITE_SERVICE_ID;
const template_id = import.meta.env.VITE_TEMPLATE_ID;
const public_key = import.meta.env.VITE_PUBLIC_KEY;

const Email = () => {
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    toast.info("Sending Message", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    try {
      await emailjs.sendForm(service_id, template_id, e.target, public_key);
      toast.success("message delivered sucessfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      e.target.reset();
    } catch (error) {
      const errMsg = error.text || error.message || "Unknown error";
      console.error(errMsg);
      toast.error(`Message not delivered (${error.status || "error"}: ${errMsg})`, {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <form
        className="w-full  p-6 rounded-lg shadow-lg space-y-4"
        onSubmit={handleOnSubmit}
      >
        <div className="flex space-x-4">
          <input
            type="text"
            name="from_name"
            placeholder="Name*"
            autoComplete="off"
            required
            className="w-1/2 p-3 bg-[#3B3B3B] text-white rounded-md focus:outline-none "
          />
          <input
            type="email"
            name="from_email"
            placeholder="Email*"
            autoComplete="off"
            required
            className="w-1/2 p-3 bg-[#3B3B3B] text-white rounded-md focus:outline-none "
          />
        </div>

        <textarea
          name="message"
          placeholder="Message*"
          autoComplete="off"
          required
          maxLength={500}
          className="w-full h-60 resize-none p-3 bg-[#3B3B3B] text-white rounded-md focus:outline-none overflow-hidden"
        />

        <button
          type="submit"
          className="w-full p-3 bg-[#3B3B3B] text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Send Message
        </button>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default Email;
