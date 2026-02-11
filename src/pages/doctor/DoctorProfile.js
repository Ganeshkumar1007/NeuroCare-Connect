import { useEffect, useState } from "react";
import DoctorSidebar from "../../components/DoctorSidebar";
import Header from "../../components/Header";

export default function DoctorProfile() {
  const doctorId = localStorage.getItem("doctorId");

  const [form, setForm] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/doctor/profile/${doctorId}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [doctorId]);

  const saveProfile = async () => {
    await fetch(
      `http://localhost:5000/api/auth/doctor/profile/${doctorId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    alert("Updated successfully");
  };

  return (
    <>
      <Header />
      <div className="doctor-layout">
        <DoctorSidebar />

        <div className="doctor-content">
          <h2>Profile</h2>

          <input
            value={form.doctorName || ""}
            onChange={(e) =>
              setForm({ ...form, doctorName: e.target.value })
            }
          />

          <input
            value={form.email || ""}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            value={form.contactNumber || ""}
            onChange={(e) =>
              setForm({
                ...form,
                contactNumber: e.target.value,
              })
            }
          />

          <button onClick={saveProfile}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
