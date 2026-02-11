import { useState } from "react";
import DoctorHeader from "../../components/DoctorHeader";
import DoctorSidebar from "../../components/DoctorSidebar";

export default function DoctorUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    alert("Uploaded successfully");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <DoctorHeader />

      <div className="flex">
        <DoctorSidebar />

        <div className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Upload Data
          </h2>

          <div className="bg-slate-800 rounded-xl p-6 max-w-xl">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4 text-slate-300"
            />

            <button
              onClick={handleUpload}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
