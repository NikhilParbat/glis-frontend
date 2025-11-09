import { useEffect, useState } from 'react';
import { fetchDisputes } from '../services/api';
import { Table } from '../components/Table';

export default function Disputes() {
  const [disputes, setDisputes] = useState([]);

  useEffect(() => {
    fetchDisputes().then((res) => setDisputes(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Land Dispute Insights</h2>
      <div className="bg-white p-5 rounded-2xl shadow">
        <Table
          headers={['Case ID', 'Region', 'Issue', 'Status', 'Filed On']}
          data={disputes.map(d => [d.caseId, d.region, d.issue, d.status, d.date])}
        />
      </div>
    </div>
  );
}
