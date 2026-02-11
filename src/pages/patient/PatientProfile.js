import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { getPatient } from "../../utils/auth";
import patientProfileStyles from "../../styles/patientProfile.styles";

export default function PatientProfile() {
  const { patientId } = getPatient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    if (!patientId) return;

    fetch(`http://localhost:5000/api/auth/patient/profile/${patientId}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name || "");
        setEmail(data.email || "");

        if (data.dateOfBirth) {
          setDateOfBirth(data.dateOfBirth.split("T")[0]);
        }
      })
      .catch(err => {
        console.error("Profile fetch error:", err);
      });
  }, [patientId]);

  const saveProfile = async () => {
    const res = await fetch(
      `http://localhost:5000/api/auth/patient/profile/${patientId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, dateOfBirth }),
      }
    );

    if (!res.ok) {
      alert("Failed to update profile");
      return;
    }

    alert("Profile updated successfully");
  };

  return (
    <>
      <Header />

      {/* SIDE-BY-SIDE LAYOUT */}
      <div className="flex min-h-[calc(100vh-72px)] bg-[#f3faf7]">
        <Sidebar />

        <div className="flex-1 p-8">
          <h2 className={patientProfileStyles.pageTitle}>
            My Profile
          </h2>

          <div className={patientProfileStyles.card}>
            <div className={patientProfileStyles.grid}>
              {/* Full Name */}
              <div className={patientProfileStyles.field}>
                <label className={patientProfileStyles.label}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={patientProfileStyles.input}
                />
              </div>

              {/* Email */}
              <div className={patientProfileStyles.field}>
                <label className={patientProfileStyles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={patientProfileStyles.input}
                />
              </div>

              {/* Date of Birth */}
              <div className={patientProfileStyles.field}>
                <label className={patientProfileStyles.label}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className={patientProfileStyles.input}
                />
              </div>
            </div>

            <button
              onClick={saveProfile}
              className={patientProfileStyles.button}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
