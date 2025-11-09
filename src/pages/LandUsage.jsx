import { useEffect, useState } from 'react';
import { fetchLandUsage } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function LandUsage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLandUsage().then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Land Usage Analysis</h2>
      <div className="bg-white p-5 rounded-2xl shadow">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="area" fill="#0f766e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
