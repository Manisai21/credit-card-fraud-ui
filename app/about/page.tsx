import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  const sections = [
    {
      title: "Advanced Fraud Detection",
      content:
        "Utilizing cutting-edge technology to detect and prevent fraudulent transactions in real-time.",
      imgSrc: "/images/ai-transaction.png",
      imgAlt: "System analyzing transactions",
      shape: "triangle",
      reverse: false,
    },
    {
      title: "Real-Time Protection Against Fraud",
      content:
        "Our system analyzes millions of transactions per second using advanced algorithms to detect suspicious activities and prevent fraud before it happens.",
      imgSrc: "/images/dashboard.png",
      imgAlt: "Dashboard displaying fraud detection insights",
      shape: "circle",
      reverse: true,
    },
    {
      title: "How Our Fraud Detection Works",
      content: (
        <ul className="list-disc list-inside text-gray-600">
          <li>🚀 Real-Time Transaction Analysis</li>
          <li>🔍 Deep Learning & Pattern Recognition</li>
          <li>🔔 Instant Fraud Alerts & Prevention</li>
          <li>📊 Adaptive Models for Evolving Threats</li>
        </ul>
      ),
      imgSrc: "/images/Infographic.png",
      imgAlt: "Infographic showing the fraud detection process",
      shape: "square",
      reverse: false,
    },
    {
      title: "Security & Trust at the Core",
      content: (
        <ul className="list-disc list-inside text-gray-600">
          <li>99% Accuracy in Fraud Detection</li>
          <li>End-to-End Data Encryption</li>
          <li>Seamless API Integration</li>
          <li>Compliance with PCI DSS & GDPR</li>
        </ul>
      ),
      imgSrc: "/images/lock-sheild.png",
      imgAlt: "Shield with a lock symbol and security elements",
      shape: "circle",
      reverse: true,
    },
    {
      title: "Helping Businesses Stay Secure",
      content: (
        <div className="text-gray-600">
          <p>🏦 500+ Banks Protected</p>
          <p>💰 $1B+ Fraud Prevented</p>
          <p>🔥 50,000+ Fraud Cases Detected in Real-Time</p>
        </div>
      ),
      imgSrc: "/images/happy-customer.png",
      imgAlt: "Happy business owner checking fraud-free transactions on their mobile",
      shape: "triangle",
      reverse: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Advanced Fraud Detection for Secure Transactions</h1>
        <p className="text-gray-600 text-lg">
          Utilizing cutting-edge technology to detect and prevent fraudulent transactions in real-time.
        </p>
        <Button variant="primary">Learn More</Button>
      </div>

      {sections.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-10 ${
            section.reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Content Section */}
          <div className="md:w-1/2 text-center md:text-left space-y-4">
            <h2 className="text-3xl font-bold">{section.title}</h2>
            <div>{section.content}</div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center relative">
            <div className={`image-container ${section.shape}`}>
              <Image
                src={section.imgSrc}
                alt={section.imgAlt}
                width={400}
                height={400} // Set consistent height and width
                className="object-cover rounded-lg shadow-lg" // Added border radius and box shadow
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutPage;