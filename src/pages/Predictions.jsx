import { useEffect, useState } from 'react';
import { fetchPredictions } from '../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Predictions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPredictions().then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Land Value Predictions</h2>
      <div className="bg-white p-5 rounded-2xl shadow">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="predictedValue" stroke="#0f766e" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
