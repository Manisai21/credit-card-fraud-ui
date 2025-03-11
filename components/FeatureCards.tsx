import React from "react";

const FeatureCards = () => {
  const images = [
    "/Images/1.jpg",
    "/Images/2.png",
    "/Images/3.png",
    "/Images/4.png",
    "/Images/5.png",
    "/Images/6.png",
    "/Images/7.png",
    "/Images/8.png",
  ];

  const features = [
    {
      title: "Real-Time Transaction Monitoring",
      description: "Monitor transactions in real-time and get instant alerts on any suspicious activity.",
    },
    {
      title: "Fraud Detection Alerts",
      description: "Stay updated with the latest alerts on potential fraudulent activities detected by our system.",
    },
    {
      title: "User Behavior Analytics",
      description: "Analyze user behavior patterns and detect anomalies compared to typical spending habits.",
    },
    {
      title: "Transaction History",
      description: "Get a quick overview of recent transactions with indicators for any flagged as suspicious.",
    },
    {
      title: "Risk Score",
      description: "View a risk score based on transaction history and behavior to assess the likelihood of fraud.",
    },
    {
      title: "Fraud Prevention Tips",
      description: "Learn tips and best practices to protect yourself from credit card fraud.",
    },
    {
      title: "Dispute Management",
      description: "Manage disputes for transactions you believe are fraudulent and get status updates on your claims.",
    },
    {
      title: "Machine Learning Insights",
      description: "Gain insights into how machine learning models are improving fraud detection over time.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {features.map((feature, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out w-3/4 md:w-full h-auto">
          <img
            src={images[index]}
            alt={feature.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
