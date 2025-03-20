"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    // Remove auth token from local storage
    localStorage.removeItem("authToken");
    // Call the logout function from the context
    logout();
    // Redirect to home after logout
    router.push("/");
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-200 via-green-200 to-yellow-100 text-gray-800 p-4 shadow-md" style={{ height: "100px", fontFamily: "'Roboto', sans-serif" }}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>Fraud Detection</h1>
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 space-y-4 md:space-y-0 absolute md:static bg-white md:bg-transparent w-full md:w-auto left-0 top-16 md:top-auto p-4 md:p-0`}
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          <NavItem href="/" text="Home" pathname={pathname} />
          <NavItem href="/about" text="About" pathname={pathname} />
          <NavItem href="/contact" text="Contact" pathname={pathname} />
          <NavItem href="/upload" text="Upload Dataset" pathname={pathname} />
        </ul>
        <div className="flex space-x-4" style={{ fontFamily: "'Roboto', sans-serif" }}>
          {isLoggedIn ? (
            <>
              <button
                onClick={handleProfileClick}
                className="bg-green-500 hover:bg-green-700 transition-colors duration-300 ease-in-out rounded-md p-2 w-24 text-center text-white"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out rounded-md p-2 w-24 text-center text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:text-white transition-colors duration-300 ease-in-out">
                <div className="bg-blue-500 hover:bg-blue-700 transition-colors duration-300 ease-in-out rounded-md p-2 w-24 text-center">
                  Login
                </div>
              </Link>
              <Link href="/register" className="text-white hover:text-white transition-colors duration-300 ease-in-out">
                <div className="bg-blue-500 hover:bg-blue-700 transition-colors duration-300 ease-in-out rounded-md p-2 w-24 text-center">
                  Register
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ href, text, pathname }: { href: string; text: string; pathname: string }) => (
  <li style={{ fontFamily: "'Roboto', sans-serif" }}>
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium relative ${
        pathname === href ? "font-bold" : ""
      }`}
    >
      {text}
      <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform transition-transform duration-300 ease-in-out ${pathname === href ? "scale-x-100" : "scale-x-0"} hover:scale-x-100`}></span>
    </Link>
  </li>
);