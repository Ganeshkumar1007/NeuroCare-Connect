import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { getPatient } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import layoutStyles from "../../styles/layout.styles";
import patientDashboardStyles from "../../styles/patientDashboard.styles";

export default function PatientDashboard() {
  const patient = getPatient();
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className={layoutStyles.layout}>
        <Sidebar />

        <div className={layoutStyles.content}>
          <h1 className={patientDashboardStyles.title}>
            Welcome, {patient.name}
          </h1>

          <div className={patientDashboardStyles.cards}>
            <div
              className={patientDashboardStyles.card}
              onClick={() => navigate("/patient/book")}
            >
              <i
                className={`fas fa-calendar-plus ${patientDashboardStyles.icon}`}
              ></i>
              <p className={patientDashboardStyles.cardText}>
                Book a New Appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
