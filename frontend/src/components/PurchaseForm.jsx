import { useState } from "react";
import { submitPurchaseRequest } from "../api/endpointCalls";

export default function PurchaseForm() {
  const [items, setItems] = useState([
    { description: "", quantity: 1, part_number: "", price: 0, total: 0 },
  ]);
  const [vendor, setVendor] = useState("");
  const [orderType, setOrderType] = useState("1");
  const [deliveryMethod, setDeliveryMethod] = useState("1");
  const [purpose, setPurpose] = useState("");
  const [comment, setComment] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const addItem = () => {
    setItems([
      ...items,
      { description: "", quantity: 1, part_number: "", price: 0, total: 0 },
    ]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] =
      field === "quantity" || field === "price" ? Number(value) : value;
    updated[index].total = updated[index].price * updated[index].quantity;
    setItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasValidItem = items.some(
      (item) => item.description.trim() !== "" && item.quantity > 0
    );
    if (!hasValidItem) {
      alert("Please include at least one valid item.");
      return;
    }

    const payload = {
      team_id: 1, // TEMP: get from session/dropdown
      author: 2, // TEMP: get from session
      post_date: new Date().toISOString().slice(0, 19).replace("T", " "),
      vendor,
      order_type: Number(orderType),
      delivery_method: Number(deliveryMethod),
      description: purpose,
      comment,
      line_items: items,
    };

    try {
      await submitPurchaseRequest(payload);
      setShowConfirmModal(true);
    } catch (err) {
      console.error("Failed to submit:", err);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md space-y-6 text-byuNavy"
      >
        <h2 className="text-2xl font-semibold">Submit a Purchase Request</h2>

        <div>
          <label className="block font-medium">Vendor *</label>
          <input
            type="text"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Order Type *</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="1">Routine</option>
            <option value="2">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Delivery Method *</label>
          <select
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="1">Ship to lab</option>
            <option value="2">Pick up in store</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Purpose / Description *</label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            className="w-full border p-2 resize-y rounded"
          />
        </div>

        {items.map((item, index) => (
          <div key={index} className="border p-4 rounded space-y-4 bg-gray-50">
            <h3 className="font-semibold text-lg">Item {index + 1}</h3>

            <div>
              <label className="block font-medium">Description *</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Part Number</label>
              <input
                type="text"
                value={item.part_number}
                onChange={(e) =>
                  handleItemChange(index, "part_number", e.target.value)
                }
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Quantity *</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  required
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Price (each)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            <p className="text-right font-medium">
              Total: ${item.total.toFixed(2)}
            </p>

            {index > 0 && (
              <button
                type="button"
                onClick={() => deleteItem(index)}
                className="text-red-600 hover:underline"
              >
                Delete Item
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="text-byuNavy hover:underline font-medium"
        >
          + Add Another Item
        </button>

        <div>
          <label className="block font-medium">Comments (optional)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-2 resize-y rounded min-h-[100px]"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-byuRoyal text-white font-semibold rounded hover:bg-[#003a9a]"
          >
            Submit Request
          </button>
        </div>
      </form>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-center shadow-lg">
            <h2 className="text-xl font-semibold text-byuNavy mb-4">
              Order Submitted
            </h2>
            <p className="text-gray-700">
              Your order was successfully submitted! It will be reviewed within
              1 business day. You can track the order status on your order
              history page.
            </p>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="mt-6 px-4 py-2 bg-byuRoyal text-white rounded hover:bg-[#003a9a]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
