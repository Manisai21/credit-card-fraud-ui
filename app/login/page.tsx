"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";

// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
// import { useAuth } from "@/context/AuthContext";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { login } = useAuth();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:8000/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Login failed");
//       }

//       const data = await response.json();
//       console.log("Login successful:", data);

//       // Store auth token in local storage
//       localStorage.setItem("authToken", data.token);

//       router.push("/");
//     } catch (error) {
//       console.error("Error logging in:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4">
//       <div className="relative w-full max-w-md">
//         <div className="relative bg-white p-10 rounded-3xl shadow-xl bg-gradient-to-br from-pink-400 to-purple-300">
//           <h2 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
//             Welcome Back! 👋
//           </h2>

//           <button className="flex items-center justify-center w-full bg-white text-gray-900 border border-gray-300 shadow-md py-3 px-5 rounded-xl font-medium mb-6 hover:bg-gray-100 transition">
//             <FcGoogle className="mr-3" size={22} /> Sign in with Google
//           </button>

//           <p className="text-center text-sm text-gray-600 mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
//             Or, sign in with email
//           </p>

//           <form onSubmit={handleLogin}>
//             <div className="mb-6">
//               <label htmlFor="email" className="block font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-6 relative">
//               <label htmlFor="password" className="block font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>
//                 Password:
//               </label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 transition"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
//               </button>
//             </div>

//             <div className="mb-4 text-right">
//               <a href="/forgot_password" className="text-sm font-bold text-blue-600 hover:underline">
//                 Forgot Password?
//               </a>
//             </div>

//             <button
//               type="submit"
//               className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition ${loading && "opacity-50 cursor-not-allowed"}`}
//               disabled={loading}
//               style={{ fontFamily: "'Roboto', sans-serif" }}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Store auth token in local storage
      localStorage.setItem("authToken", data.token);

      // Update the auth context
      login();

      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-md">
        <div className="relative bg-white p-10 rounded-3xl shadow-xl bg-gradient-to-br from-pink-400 to-purple-300">
          <h2 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Welcome Back! 👋
          </h2>

          <button className="flex items-center justify-center w-full bg-white text-gray-900 border border-gray-300 shadow-md py-3 px-5 rounded-xl font-medium mb-6 hover:bg-gray-100 transition">
            <FcGoogle className="mr-3" size={22} /> Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-600 mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Or, sign in with email
          </p>

          <form onSubmit={handleLogin}>
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

            <div className="mb-6 relative">
              <label htmlFor="password" className="block font-semibold" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 transition"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </button>
            </div>

            <div className="mb-4 text-right">
              <a href="/forgot_password" className="text-sm font-bold text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition ${loading && "opacity-50 cursor-not-allowed"}`}
              disabled={loading}
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}