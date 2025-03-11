"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen  mt-10">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl transform rotate-6"></div>
        <div className="absolute -top-2 -left-2 w-full h-full bg-blue-300 rounded-2xl transform -rotate-6"></div>
        <div className="relative bg-gradient-to-br from-pink-400 to-purple-300 p-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ fontFamily: "'Roboto', sans-serif" }}>Get in touch!</h2>
          <p className="text-center text-gray-700 mb-8" style={{ fontFamily: "'Open Sans', sans-serif" }}>We'd love to hear from you. Fill up the form below to send us a message.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter Your Name" required />
            </div>
            <div className="mb-6">
              <label className="block font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter Your Email" required />
            </div>
            <div className="mb-6">
              <label className="block font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>Phone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter Your Phone" required />
            </div>
            <div className="mb-6">
              <label className="block font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>Message:</label>
              <textarea name="message" value={formData.message} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Type your message here..." rows="5" required></textarea>
            </div>
            <div className="flex justify-between">
              <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg shadow-md hover:opacity-90" style={{ fontFamily: "'Roboto', sans-serif" }}>Send ➤</button>
              <button type="button" onClick={handleReset} className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-8 py-3 rounded-lg shadow-md hover:opacity-90" style={{ fontFamily: "'Roboto', sans-serif" }}>Reset ➤</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
