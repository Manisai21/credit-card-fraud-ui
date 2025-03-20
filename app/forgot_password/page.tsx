"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      console.log("Password reset email sent:", data);
      // Redirect to login or show success message
      router.push("/login");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-md">
        <div className="relative bg-white p-10 rounded-3xl shadow-xl bg-gradient-to-br from-pink-400 to-purple-300">
          <h2 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Forgot Password? 🔒
          </h2>

          <p className="text-center text-sm text-gray-600 mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleForgotPassword}>
            <div className="mb-6">
              <label htmlFor="email" className="block font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition ${loading && "opacity-50 cursor-not-allowed"}`}
              disabled={loading}
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
