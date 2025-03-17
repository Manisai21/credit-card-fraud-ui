"use client";
import Visualization from "@/components/Visualization";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [data, setData] = useState<any>(null); // Change to any to accommodate visualization data
  const [showTable, setShowTable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setMessage(null);
    setData(null); // Clear data when new files are dropped
    setShowTable(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async (model: string) => {
    if (files.length === 0) {
      alert("Please upload a file first.");
      return;
    }

    setIsLoading(true);
    setMessage(`${model.charAt(0).toUpperCase() + model.slice(1)} predictions loading...`);

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      const response = await axios.post(`http://127.0.0.1:8000/${model}/train/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(`${model.charAt(0).toUpperCase() + model.slice(1)} predictions loaded successfully. Accuracy: ${response.data.accuracy}`);
      setData(response.data); // Set the entire response data for visualization
      setShowTable(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
      setIsLoading(false);
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
      {isLoading ? (
        <div className="mt-4 text-center">
          <Spinner />
          <p>{message}</p>
        </div>
      ) : (
        <>
          {message && <div className="mt-4 text-green-600">{message}</div>}
          {showTable && data && (
            <>
              <div className="w-full max-w-4xl mt-6 overflow-x-auto">
                <div className="table-wrapper" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="py-2 px-2 border-b">Time</th>
                        <th className="py-2 px-2 border-b">V1</th>
                        <th className="py-2 px-2 border-b">V2</th>
                        <th className="py-2 px-2 border-b">V3</th>
                        <th className="py-2 px-2 border-b">V4</th>
                        <th className="py-2 px-2 border-b">Prediction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.map((row, index) => (
                        <tr key={index} className={row.Prediction === 0 ? "bg-gray-100" : "bg-white"}>
                          <td className="border px-2 py-2">{row.Time}</td>
                          <td className="border px-2 py-2">{row.V1}</td>
                          <td className="border px-2 py-2">{row.V2}</td>
                          <td className="border px-2 py-2">{row.V3}</td>
                          <td className="border px-2 py-2">{row.V4}</td>
                          <td className={`border px-2 py-2 ${row.Prediction === 0 ? "text-red-500" : "text-green-500"}`}>
                            {row.Prediction}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col items-start p-6 space-y-6 w-full">
                <Visualization data={data} /> {/* Include the Visualization component */}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}