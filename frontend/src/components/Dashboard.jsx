export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-2 w-64"
        />
      </div>

      <table className="w-full table-fixed border-collapse border text-byuNavy">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Form Submitted</th>
            <th className="border px-4 py-2">Vendor</th>
            <th className="border px-4 py-2">Shipping</th>
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Student Email</th>
            <th className="border px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white hover:bg-gray-50">
            <td className="border px-4 py-2 text-center">
              <span className="px-3 py-1 rounded font-medium inline-block bg-[#E61744] text-white">
                Requested
              </span>
            </td>
            <td className="border px-4 py-2 text-center">07-09-2025</td>
            <td className="border px-4 py-2 text-center">Walmart</td>
            <td className="border px-4 py-2 text-center">Pickup</td>
            <td className="border px-4 py-2 text-center">Jane Doe</td>
            <td className="border px-4 py-2 text-center">jane@example.com</td>
            <td className="border px-4 py-2 text-center">
              <div className="flex justify-center gap-3">
                <button className="px-3 py-1 border border-byuNavy text-byuNavy rounded hover:bg-byuNavy hover:text-white transition-colors duration-150 text-sm font-medium">
                  View
                </button>
                <button className="px-3 py-1 border border-byuRoyal text-byuRoyal rounded hover:bg-byuRoyal hover:text-white transition-colors duration-150 text-sm font-medium">
                  Update
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
