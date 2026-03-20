import { useEffect, useState } from "react";
import DoctorSidebar from "../../components/DoctorSidebar";
import Header from "../../components/Header";

export default function DoctorAnalytics() {
  const doctorId = localStorage.getItem("doctorId");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!doctorId) return;
    fetch(`http://localhost:5000/api/appointments/doctor/${doctorId}`)
      .then((res) => res.json())
      .then((data) => setAppointments(data.appointments || []));
  }, [doctorId]);

  const total = appointments.length;
  const completed = appointments.filter((a) => a.status === "COMPLETED").length;
  const pending = appointments.filter((a) => a.status === "BOOKED").length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <div className="flex">
        <DoctorSidebar />
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-6">Analytics</h2>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <p className="text-slate-400 text-sm mb-2">Total Appointments</p>
              <p className="text-3xl font-bold">{total}</p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <p className="text-slate-400 text-sm mb-2">Completed</p>
              <p className="text-3xl font-bold text-green-400">{completed}</p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <p className="text-slate-400 text-sm mb-2">Pending</p>
              <p className="text-3xl font-bold text-red-400">{pending}</p>
            </div>
          </div>

          <div className="mt-8 bg-slate-900 rounded-xl shadow-lg border border-slate-800 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-800 text-slate-300 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Patient ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                      No Appointment Data
                    </td>
                  </tr>
                )}
                {appointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-slate-800 transition">
                    <td className="px-6 py-4">{appt.patientId}</td>
                    <td className="px-6 py-4">{appt.date}</td>
                    <td className="px-6 py-4">{appt.time}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appt.status === "COMPLETED"
                            ? "bg-green-600/20 text-green-400"
                            : "bg-red-600/20 text-red-400"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
