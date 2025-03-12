"use client";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async (model: string) => {
    if (files.length === 0) {
      alert("Please upload a file first.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      const response = await axios.post(`http://127.0.0.1:8000/${model}/train/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(`Model trained successfully. Accuracy: ${response.data.accuracy}`);
      setData(response.data.data);
      setShowTable(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Upload Your Files</h1>
      <div {...getRootProps()} className="w-full max-w-lg p-10 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
        <input {...getInputProps()} />
        <p className="mt-2 text-gray-600">Drag & Drop files here</p>
      </div>
      <div className="flex space-x-4">
        <Button onClick={() => handleUpload('logistic')} className="bg-blue-600 hover:bg-blue-700">
          Logistic Regression
        </Button>
        <Button onClick={() => handleUpload('random_forest')} className="bg-green-600 hover:bg-green-700">
          Random Forest
        </Button>
        <Button onClick={() => handleUpload('xgboost')} className="bg-red-600 hover:bg-red-700">
          XGBoost
        </Button>
      </div>
      {message && <div className="mt-4 text-green-600">{message}</div>}
      {showTable && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto w-11/12 max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">Predictions:</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Time</th>
                  <th className="py-2">V1</th>
                  <th className="py-2">V2</th>
                  <th className="py-2">V3</th>
                  <th className="py-2">V4</th>
                  <th className="py-2">Prediction</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className={row.Prediction === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="border px-4 py-2">{row.Time}</td>
                    <td className="border px-4 py-2">{row.V1}</td>
                    <td className="border px-4 py-2">{row.V2}</td>
                    <td className="border px-4 py-2">{row.V3}</td>
                    <td className="border px-4 py-2">{row.V4}</td>
                    <td className="border px-4 py-2">{row.Prediction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}