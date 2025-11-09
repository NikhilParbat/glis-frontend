import { useEffect, useState } from 'react';
import { fetchEncroachments } from '../services/api';
import { Table } from '../components/Table';

export default function Encroachment() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchEncroachments().then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Encroachment Analysis</h2>
      <div className="bg-white p-5 rounded-2xl shadow">
        <Table
          headers={['Region', 'Encroached Area (sq.km)', 'Status', 'Last Updated']}
          data={data.map(item => [item.region, item.area, item.status, item.updatedAt])}
        />
      </div>
    </div>
  );
}
