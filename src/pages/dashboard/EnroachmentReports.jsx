import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { encroachmentsReport } from "../../services/api";

export default function EncroachmentReports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const loadEncroachments = async () => {
      try {
        const { data } = await encroachmentsReport();
        setReport(data);
      } catch (error) {
        console.error("Error fetching encroachments:", error);
      }
    };
    loadEncroachments();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar role="Viewer" />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Navbar title="Encroachment Reports" />

        <main className="p-6 overflow-auto">
          {!report ? (
            <p className="text-gray-600">Loading report...</p>
          ) : (
            <table className="min-w-full border bg-white rounded-xl shadow-md">
              <thead className="bg-green-200 text-gray-800 font-semibold">
                <tr>
                  <th className="p-3 text-left">Total Lands</th>
                  <th className="p-3 text-left">Encroached</th>
                  <th className="p-3 text-left">Disputed</th>
                  <th className="p-3 text-left">Total Value (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3">{report.totalLands}</td>
                  <td className="p-3">{report.encroached}</td>
                  <td className="p-3">{report.disputed}</td>
                  <td className="p-3">
                    {report.totalValue?.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
}
