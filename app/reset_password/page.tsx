"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function ResetPasswordPage() {
//   const [newPassword, setNewPassword] = useState("");
//   const [token, setToken] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:8000/auth/reset_password", { // Updated endpoint
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token, new_password: newPassword }), // Ensure the key matches the backend
//       });

//       if (!response.ok) {
//         const errorData = await response.json(); // Capture error response
//         throw new Error(errorData.detail || "Request failed");
//       }

//       const data = await response.json();
//       console.log("Password reset successful:", data);
//       // Redirect to login or show success message
//       router.push("/login");
//     } catch (error) {
//       console.error("Error resetting password:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4">
//       <div className="relative w-full max-w-md">
//         <div className="relative bg-white p-10 rounded-3xl shadow-xl bg-gradient-to-br from-pink-400 to-purple-300">
//           <h2 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
//             Reset Password 🔑
//           </h2>

//           <p className="text-center text-sm text-gray-600 mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
//             Enter your new password.
//           </p>

//           <form onSubmit={handleResetPassword}>
//             <div className="mb-6">
//               <label htmlFor="token" className="block font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>
//                 Reset Token:
//               </label>
//               <input
//                 type="text"
//                 id="token"
//                 className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Enter your reset token"
//                 value={token}
//                 onChange={(e) => setToken(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label htmlFor="newPassword" className="block font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>
//                 New Password:
//               </label>
//               <input
//                 type="password"
//                 id="newPassword"
//                 className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Enter your new password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition ${loading && "opacity-50 cursor-not-allowed"}`}
//               disabled={loading}
//               style={{ fontFamily: "'Roboto', sans-serif" }}
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract token from URL
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const tokenFromUrl = query.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Request failed");
      }

      const data = await response.json();
      console.log("Password reset successful:", data);
      // Redirect to login or show success message
      router.push("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-md">
        <div className="relative bg-white p-10 rounded-3xl shadow-xl bg-gradient-to-br from-pink-400 to-purple-300">
          <h2 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Reset Password 🔑
          </h2>

          <p className="text-center text-sm text-gray-600 mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Enter your new password.
          </p>

          <form onSubmit={handleResetPassword}>
            <div className="mb-6">
              <label htmlFor="newPassword" className="block font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition ${loading && "opacity-50 cursor-not-allowed"}`}
              disabled={loading}
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}