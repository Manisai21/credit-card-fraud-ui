import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";

const Visualization = ({ data }) => {
    const [selectedChart, setSelectedChart] = useState('confusionMatrix');
    const [isDataLoading, setIsDataLoading] = useState(false);

    useEffect(() => {
        setIsDataLoading(true);
        setTimeout(() => {
            setIsDataLoading(false);
        }, 1000); // Simulate data loading time
    }, [selectedChart]);

    const renderChart = () => {
        if (isDataLoading) {
            return (
                <div className="text-gray-500 text-left">Loading chart...</div>
            );
        }

        switch (selectedChart) {
            case 'confusionMatrix':
                return (
                    <BarChart width={800} height={400} data={data.confusion_matrix.map((value, index) => ({ name: `Class ${index}`, value }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                );
            case 'rocCurve':
                return (
                    <LineChart width={800} height={400} data={data.roc_curve.fpr.map((fpr, index) => ({ fpr, tpr: data.roc_curve.tpr[index] }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="fpr" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="tpr" stroke="#8884d8" />
                    </LineChart>
                );
            case 'featureImportance':
                return (
                    <BarChart width={800} height={400} data={data.feature_importances.map((importance, index) => ({ feature: `V${index + 1}`, importance }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="feature" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="importance" fill="#8884d8" />
                    </BarChart>
                );
            case 'fraudDistribution':
                return (
                    <PieChart width={800} height={400}>
                        <Pie data={Object.entries(data.fraud_distribution).map(([name, value]) => ({ name, value }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
                        <Tooltip />
                    </PieChart>
                );
            case 'fraudOverTime':
                return (
                    <LineChart width={800} height={400} data={Object.entries(data.fraud_over_time).map(([time, fraud]) => ({ time, fraud }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="fraud" stroke="#8884d8" />
                    </LineChart>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-start p-6 space-y-4 w-full">
            {/* Heading and Dropdown Stay Aligned */}
            <h1 className="text-2xl font-semibold">Visualizations</h1>
            <select 
                onChange={(e) => setSelectedChart(e.target.value)} 
                className="border p-2 rounded"
            >
                <option value="confusionMatrix">Confusion Matrix</option>
                <option value="rocCurve">ROC Curve</option>
                <option value="featureImportance">Feature Importance</option>
                <option value="fraudDistribution">Fraud Distribution</option>
                <option value="fraudOverTime">Fraud Over Time</option>
            </select>

            {/* Chart Container: Ensures No Jumping in Layout */}
            <div className="w-full flex justify-start items-start min-h-[450px]">
                {renderChart()}
            </div>
        </div>
    );
};

export default Visualization;
