"use client";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_no: "",
    password: "",
    confirmPassword: "",
    loc: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          phone_no: formData.phone_no,
          email : formData.email,
          loc: formData.loc,
          password: formData.password
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      console.log("User registered successfully:", data);
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-md">

        <div className="relative bg-white p-10 rounded-xl shadow-xl bg-gradient-to-br from-pink-400 to-purple-300">
          <h2 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Create an Account 🚀
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full Name", name: "full_name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone_no", type: "tel" },
              { label: "Location", name: "loc", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-semibold">{field.label}:</label>
                <input
                  type={field.type}
                  name={field.name as keyof typeof formData}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {[
              { label: "Password", name: "password", show: showPassword, toggle: setShowPassword },
              { label: "Confirm Password", name: "confirmPassword", show: showConfirmPassword, toggle: setShowConfirmPassword },
            ].map((field) => (
              <div key={field.name} className="relative">
                <label className="block font-semibold">{field.label}:</label>
                <input
                  type={field.show ? "text" : "password"}
                  name={field.name as keyof typeof formData}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 transition"
                  onClick={() => field.toggle(!field.show)}
                >
                  {field.show ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
            ))}

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-md font-bold hover:opacity-90 transition ${loading && "opacity-50 cursor-not-allowed"}`}
              disabled={loading}
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
