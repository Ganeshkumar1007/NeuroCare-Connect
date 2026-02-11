import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { getPatient } from "../../utils/auth";
import patientResultsStyles from "../../styles/patientResults.styles";

export default function PatientResults() {
  const { patientId } = getPatient();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/results/patient/${patientId}`)
      .then(res => res.json())
      .then(data => setResults(data.results));
  }, [patientId]);

  return (
    <>
      <Header />

      {/* ✅ SIDE-BY-SIDE LAYOUT FIX */}
      <div className="flex min-h-[calc(100vh-72px)] bg-[#f3faf7]">
        <Sidebar />

        <div className="flex-1 p-8">
          <h2 className={patientResultsStyles.pageTitle}>
            My Test Results
          </h2>

          <div className={patientResultsStyles.card}>
            {/* Header row */}
            <div className={patientResultsStyles.tableHeader}>
              <div>Date</div>
              <div>Title</div>
              <div className="text-right">Action</div>
            </div>

            {results.map(r => {
              const pdfUrl = `http://localhost:5000/uploads/reports/${r.reportFile}`;

              return (
                <div
                  key={r._id}
                  className={patientResultsStyles.row}
                >
                  <div className={patientResultsStyles.cell}>
                    {r.date}
                  </div>

                  <div className={patientResultsStyles.cell}>
                    {r.title}
                  </div>

                  <div className={patientResultsStyles.actions}>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={patientResultsStyles.viewBtn}
                    >
                      View
                    </a>

                    <a
                      href={pdfUrl}
                      download
                      className={patientResultsStyles.downloadBtn}
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              );
            })}

            {results.length === 0 && (
              <div className="px-6 py-6 text-sm text-slate-500">
                No test results available.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
