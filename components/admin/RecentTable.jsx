"use client";

export default function RecentTable({ title, columns, rows }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white">
      <div className="border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left">
          <thead className="text-xs text-gray-500">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 font-medium">{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {rows.map((r, idx) => (
              <tr key={idx} className="border-t border-gray-50 hover:bg-gray-50/50">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3">
                    {c.render ? c.render(r[c.key], r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
