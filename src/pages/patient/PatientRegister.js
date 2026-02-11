import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  emailRegex,
  phoneRegex,
  passwordRegex,
  dateRegex,
} from "../../utils/validators";
import patientRegisterStyles from "../../styles/patientRegister.style";

export default function PatientRegister() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => { 
    let err = {};
    if (!form.name) err.name = true;
    if (!emailRegex.test(form.email || "")) err.email = true;
    if (!phoneRegex.test(form.contactNumber || "")) err.contactNumber = true;
    if (!dateRegex.test(form.dateOfBirth || "")) err.dateOfBirth = true;
    if (!passwordRegex.test(form.password || "")) err.password = true;

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const today = new Date().toISOString().split("T")[0];

  const submit = async () => {
    if (!validate()) return;

    const res = await fetch(
      "http://localhost:5000/api/auth/register-patient",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) navigate("/patient/success");
    else alert("Registration failed");
  };

  const inputClass = (field) =>
    `${patientRegisterStyles.inputBase} ${
      errors[field]
        ? patientRegisterStyles.inputError
        : patientRegisterStyles.inputNormal
    }`;

  return (
    <div className={patientRegisterStyles.page}>
      <div className={patientRegisterStyles.card}>
        <h2 className={patientRegisterStyles.title}>
          Patient Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className={inputClass("name")}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className={inputClass("email")}
        />

        <input
          type="tel"
          placeholder="Contact Number"
          onChange={(e) =>
            setForm({
              ...form,
              contactNumber: e.target.value,
            })
          }
          className={inputClass("contactNumber")}
        />

        <input
          type="date"
          max={today}
          onChange={(e) =>
            setForm({
              ...form,
              dateOfBirth: e.target.value,
            })
          }
          className={inputClass("dateOfBirth")}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className={inputClass("password")}
        />

        <button
          onClick={submit}
          className={patientRegisterStyles.button}
        >
          Register
        </button>

        <p className={patientRegisterStyles.footerText}>
          Already registered?{" "}
          <Link
            to="/patient/login"
            className={patientRegisterStyles.footerLink}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
