import "./globals.css";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Credit Card Fraud Detection",
  description: "Detect fraud transactions with AI models",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-blue-100 via-green-100 to-yellow-50">
        <AuthProvider>
        <Header /> 
        <main className="min-h-screen p-5">{children}</main>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
