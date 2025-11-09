export function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-semibold text-primary">{value}</p>
    </div>
  );
}

export function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
