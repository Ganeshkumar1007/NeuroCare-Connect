import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { getPatient } from "../../utils/auth";
import patientAppointmentsStyles from "../../styles/patientAppointments.styles";

export default function PatientAppointments() {
  const { patientId } = getPatient();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/appointments/patient/${patientId}`)
      .then(res => res.json())
      .then(data => {
        const bookedAppointments = data.appointments.filter(
          app => app.status === "BOOKED"
        );
        setAppointments(bookedAppointments);
      });
  }, [patientId]);

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm("Cancel this appointment?")) return;

    await fetch(
      `http://localhost:5000/api/appointments/${appointmentId}`,
      { method: "DELETE" }
    );

    setAppointments(prev =>
      prev.filter(app => app._id !== appointmentId)
    );
  };

  const rescheduleAppointment = async (appointmentId) => {
    const newTime = prompt("Enter new time (HH:MM)");
    if (!newTime) return;

    const res = await fetch(
      `http://localhost:5000/api/appointments/reschedule/${appointmentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTime }),
      }
    );

    if (!res.ok) {
      alert("Reschedule failed");
      return;
    }

    setAppointments(prev =>
      prev.map(app =>
        app._id === appointmentId
          ? { ...app, time: newTime }
          : app
      )
    );
  };

  return (
    <>
      <Header />

      {/* ✅ SIDE-BY-SIDE LAYOUT FIX */}
      <div className="flex min-h-[calc(100vh-72px)] bg-[#f3faf7]">
        <Sidebar />

        <div className="flex-1 p-8">
          <h2 className={patientAppointmentsStyles.pageTitle}>
            My Appointments
          </h2>

          <div className={patientAppointmentsStyles.card}>
            <div className={patientAppointmentsStyles.header}>
              Upcoming Appointments
            </div>

            <div className={patientAppointmentsStyles.list}>
              {appointments.map(app => (
                <div
                  key={app._id}
                  className={patientAppointmentsStyles.row}
                >
                  <div className={patientAppointmentsStyles.details}>
                    {app.date} – {app.time} – {app.doctorName}
                  </div>

                  <div className={patientAppointmentsStyles.actions}>
                    <span
                      className={patientAppointmentsStyles.reschedule}
                      onClick={() => rescheduleAppointment(app._id)}
                    >
                      Reschedule
                    </span>

                    <span
                      className={patientAppointmentsStyles.cancel}
                      onClick={() => cancelAppointment(app._id)}
                    >
                      Cancel
                    </span>
                  </div>
                </div>
              ))}

              {appointments.length === 0 && (
                <div className="px-6 py-6 text-slate-500 text-sm">
                  No upcoming appointments.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
