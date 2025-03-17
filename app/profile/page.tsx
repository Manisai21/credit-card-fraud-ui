"use client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface UserData {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded: { user_id: number } = jwtDecode(token);
        axios.get(`http://127.0.0.1:8000/users/${decoded.user_id}`)
          .then(response => {
            setUserData(response.data);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <main className="container px-4 py-4 sm:px-6">
      <nav className="mt-10 flex h-20 flex-col items-start justify-center sm:mt-16 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-center text-2xl font-bold sm:pt-0 sm:text-3xl lg:text-4xl">User Dashboard</h1>
      </nav>
      
      <section className="relative flex h-full justify-center lg:h-[400px]">
        <div className="flex w-65 flex-col justify-center rounded-3xl bg-gradient-to-tl from-sky-300 via-purple-300 to-indigo-400 p-6 px-8 text-white shadow-lg sm:w-2/3">
          <h2 className="mb-6 text-center text-lg font-bold text-gray-800 sm:text-2xl">My Details</h2>
          <div className="flex w-full justify-center overflow-x-auto">
            <div className="overflow-x-scroll rounded-2xl bg-gradient-to-br from-sky-300 via-purple-300 to-indigo-400 text-white shadow-2xl sm:overflow-hidden px-3 py-4 lg:px-20 lg:py-6 xl:px-24 xl:py-8">
              <table className="divide-y divide-gray-200">
                <tbody>
                  <tr>
                    <td className="px-3 py-2 text-xs font-bold text-black sm:px-6 sm:py-4 md:text-base">Name</td>
                    <td className="rounded-4xl px-3 py-2 text-xs font-bold text-black sm:px-6 sm:py-4 md:text-base">{userData?.name || 'Loading...'}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-xs font-bold text-black sm:px-6 sm:py-4 md:text-base">Email</td>
                    <td className="rounded-4xl px-3 py-2 text-xs font-bold text-black sm:px-6 sm:py-4 md:text-base">
                      <a href={`mailto:${userData?.email}`} className="no-underline hover:underline">{userData?.email || 'Loading...'}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}