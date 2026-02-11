import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import patientLoginStyles from "../../styles/patientLogin.style";

export default function PatientLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/login-patient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Invalid login");
      return;
    }

    // ✅ store before navigation
    localStorage.setItem("patientId", data.patientId);
    localStorage.setItem("patientName", data.name);
    localStorage.setItem("role", data.role);

    navigate("/patient/dashboard", { replace: true });
  };

  return (
    <div className={patientLoginStyles.page}>
      <div className={patientLoginStyles.card}>
        <h2 className={patientLoginStyles.title}>
          Patient Sign In
        </h2>

        <form
          onSubmit={handleLogin}
          className={patientLoginStyles.form}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={patientLoginStyles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={patientLoginStyles.input}
          />

          <button
            type="submit"
            className={patientLoginStyles.primaryButton}
          >
            Login
          </button>
        </form>

        <p className={patientLoginStyles.footerText}>
          Don’t have an account?{" "}
          <Link
            to="/patient/register"
            className={patientLoginStyles.footerLink}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
