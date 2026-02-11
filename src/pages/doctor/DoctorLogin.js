import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordRegex } from "../../utils/validators";
import doctorLoginStyles from "../../styles/doctorLogon.style";

export default function DoctorLogin() {
  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const submit = async () => {
  if (!doctorId || !passwordRegex.test(password)) {
    alert("Invalid input");
    return;
  }

  const res = await fetch("http://localhost:5000/api/auth/login-doctor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ doctorId, password }),
  });

  const data = await res.json();  // ✅ Read ONLY ONCE

  console.log("Response status:", res.status);
  console.log("Response data:", data);

  if (!res.ok) {
    alert(data.message || "Invalid login");
    return;
  }

  // store doctor data
  localStorage.setItem("doctorId", data.doctorId);
  localStorage.setItem("role", data.role);

  navigate("/doctor/dashboard");
};



  return (
    <div className={doctorLoginStyles.page}>
      <div className={doctorLoginStyles.card}>
        <h2 className={doctorLoginStyles.title}>
          Doctor Secure Login
        </h2>

        <input
          type="text"
          placeholder="Medical License ID"
          onChange={(e) => setDoctorId(e.target.value)}
          className={doctorLoginStyles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className={doctorLoginStyles.input}
        />

        <button
          onClick={submit}
          className={doctorLoginStyles.button}
        >
          Login
        </button>

        <p className={doctorLoginStyles.footerText}>
          Forgot License ID / Password?
        </p>
      </div>
    </div>
  );
}
