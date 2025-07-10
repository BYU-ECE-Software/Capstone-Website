import React, { useState } from "react";

const ViewOrderModal = ({ isOpen, onClose, order }) => {
  const [activeTab, setActiveTab] = useState("items");

  const formatDatePlain = (isoString) => {
    if (!isoString) return "";
    const [year, month, day] = isoString.split("T")[0].split("-");
    return `${month}/${day}/${year}`;
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-byuNavy mb-4">Order Details</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-4 border-b pb-2">
          <button
            onClick={() => setActiveTab("items")}
            className={`px-3 py-1 ${
              activeTab === "items"
                ? "border-b-2 border-byuNavy text-byuNavy font-semibold"
                : "text-gray-500"
            }`}
          >
            Items
          </button>
          <button
            onClick={() => setActiveTab("purchase")}
            className={`px-3 py-1 ${
              activeTab === "purchase"
                ? "border-b-2 border-byuNavy text-byuNavy font-semibold"
                : "text-gray-500"
            }`}
          >
            Purchase Info
          </button>
          <button
            onClick={() => setActiveTab("student")}
            className={`px-3 py-1 ${
              activeTab === "student"
                ? "border-b-2 border-byuNavy text-byuNavy font-semibold"
                : "text-gray-500"
            }`}
          >
            Student Info
          </button>
        </div>

        {/* ITEMS TAB */}
        {activeTab === "items" && (
          <div className="space-y-4 text-byuNavy text-base">
            <div className="flex items-start gap-2">
              <span className="font-semibold">Order State:</span>
              <span>{order.order_state}</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-semibold">Vendor:</span>
              <span>{order.vendor}</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-semibold">Delivery Method:</span>
              <span>{order.delivery_method}</span>
            </div>

            <div className="text-sm text-gray-800">{order.comment}</div>

            {order.items?.map((item) => (
              <div
                key={item.id}
                className="border rounded p-4 bg-gray-50 shadow-sm space-y-2"
              >
                <div className="text-base font-semibold text-byuNavy">
                  {item.description || "Unnamed Item"}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-700">
                  <div>Quantity: {item.quantity}</div>
                  <div>Price: ${item.price}</div>
                  <div>Total: ${item.total}</div>
                </div>
                {item.part_number && (
                  <div className="text-sm text-gray-600">
                    Part #: {item.part_number}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PURCHASE TAB */}
        {activeTab === "purchase" && (
          <div className="space-y-2">
            {[
              ["Order ID", order.order_id],
              ["Post Date", formatDatePlain(order.post_date)],
              ["Order Type", order.order_type],
              ["Delivery Method", order.delivery_method],
              ["Suggested Vendor", order.suggested_vendor],
              ["Vendor Not Listed", order.vendor_not_listed ? "Yes" : "No"],
              ["Other Vendor", order.other_vendor],
              ["Quote Number", order.quote_number],
              ["Sales Rep Name", order.sales_rep_name],
              ["Sales Rep Email", order.sales_rep_email],
              ["Sales Rep Phone", order.sales_rep_phone],
              ["Vendor Website", order.vendor_website],
              ["Tracking Number", order.tracking_number],
              ["Subtotal", order.subtotal ? `$${order.subtotal}` : "—"],
              ["Utah Tax", order.utah_tax ? `$${order.utah_tax}` : "—"],
              ["Other", order.other ? `$${order.other}` : "—"],
              ["Shipping", order.shipping ? `$${order.shipping}` : "—"],
              [
                "Invoice Total",
                order.invoice_total ? `$${order.invoice_total}` : "—",
              ],
              [
                "Budget Total",
                order.budget_total ? `$${order.budget_total}` : "—",
              ],
              ["Change State", order.change_state],
              ["Schedule", order.schedule],
              ["Description", order.description],
              ["Method", order.method],
              ["Financial Category", order.financial_category],
              ["Month", order.month],
              ["Office Notes", order.office_notes],
              ["Attached File", order.attached_file],
              ["Reference Number", order.reference_number],
              ["Additional Info", order.additional_information],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between py-2 border-b border-gray-200"
              >
                <span className="text-sm font-medium text-byuNavy">
                  {label}
                </span>
                <span className="text-sm text-gray-700">
                  {value != null && value !== "" ? value : "—"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* STUDENT TAB */}
        {activeTab === "student" && (
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-byuNavy">Author (User ID)</span>
              <span className="text-gray-700">{order.author}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-byuNavy">Team ID</span>
              <span className="text-gray-700">{order.team_id}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrderModal;
