import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import PatientLogin from "./pages/patient/PatientLogin";
import PatientRegister from "./pages/patient/PatientRegister";
import DoctorLogin from "./pages/doctor/DoctorLogin";
import DoctorSuccess from "./pages/doctor/DoctorSuccess";

// Patient protected routes
import PatientRoutes from "./routes/PatientRoutes";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

// Simple auth check
const isPatientLoggedIn = () => {
  return !!localStorage.getItem("patientId");
};


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        {/* 🔐 PROTECTED PATIENT ROUTES */}
        <Route
          path="/patient/*"
          element={
            isPatientLoggedIn() ? (
              <PatientRoutes />
            ) : (
              <Navigate to="/patient/login" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
