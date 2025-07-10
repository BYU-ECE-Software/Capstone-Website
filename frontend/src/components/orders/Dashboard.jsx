import { useEffect, useState } from "react";
import { fetchOrders } from "../../api/endpointCalls";
import ViewOrderModal from "./ViewOrderModal";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  //State for view order modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
      }
    };

    loadOrders();
  }, []);

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
          {orders.map((order) => (
            <tr key={order.order_id} className="bg-white hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">
                <span className="px-3 py-1 rounded font-medium inline-block bg-[#E61744] text-white">
                  {order.order_state ?? "N/A"}
                </span>
              </td>
              <td className="border px-4 py-2 text-center">
                {order.post_date
                  ? new Date(order.post_date).toLocaleDateString("en-US")
                  : "N/A"}
              </td>
              <td className="border px-4 py-2 text-center">
                {order.vendor ?? "N/A"}
              </td>
              <td className="border px-4 py-2 text-center">
                {order.delivery_method ?? "N/A"}
              </td>
              <td className="border px-4 py-2 text-center">
                {order.author ?? "N/A"}
              </td>
              <td className="border px-4 py-2 text-center">
                {order.team_id ?? "N/A"}
              </td>
              <td className="border px-4 py-2 text-center">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsViewModalOpen(true);
                    }}
                    className="px-3 py-1 border border-byuNavy text-byuNavy rounded hover:bg-byuNavy hover:text-white transition-colors duration-150 text-sm font-medium"
                  >
                    View
                  </button>
                  <button className="px-3 py-1 border border-byuRoyal text-byuRoyal rounded hover:bg-byuRoyal hover:text-white transition-colors duration-150 text-sm font-medium">
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <ViewOrderModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          order={selectedOrder}
        />
      )}
    </div>
  );
}
