"use client";
import { File, UploadCloud } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleGoogleDriveUpload = () => {
    // Google Drive upload logic
  };

  const handleDropboxUpload = () => {
    // Dropbox upload logic
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Upload Your Files</h1>

      {/* Drag and Drop Area */}
      <div
        {...getRootProps()}
        className="w-full max-w-lg p-10 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500"
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-12 h-12 text-gray-500" />
        <p className="mt-2 text-gray-600">Drag & Drop files here</p>
      </div>

      {/* Buttons for Google Drive & Dropbox */}
      <div className="flex space-x-4">
        <Button onClick={handleGoogleDriveUpload} className="bg-blue-600 hover:bg-blue-700">
          Upload from Google Drive
        </Button>
        <Button onClick={handleDropboxUpload} className="bg-blue-400 hover:bg-blue-500">
          Upload from Dropbox
        </Button>
      </div>

      {/* Uploaded Files List */}
      <div className="w-full max-w-lg mt-4">
        <h2 className="text-lg font-semibold">Uploaded Files:</h2>
        <ul className="mt-2 space-y-2">
          {files.map((file, index) => (
            <li key={index} className="flex items-center space-x-2 p-2 border rounded-md">
              <File className="w-5 h-5 text-gray-500" />
              <span>{file.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}