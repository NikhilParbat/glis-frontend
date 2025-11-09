export function Table({ headers, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-primary text-white">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2">{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center py-3 text-gray-500">
                No records available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
