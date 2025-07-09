/**
 * Export functions that do the useEffect.fetch stuff so that we don't have to do it in every component that accesses the server
 */

exports.fetchTeamById = async (id) => {
  const response = await fetch(`/teams/${id}`);
  if (!response.ok) throw new Error("Failed to fetch team");
  return await response.json();
};

exports.fetchTeamIds = async () => {
  const response = await fetch(`/teams`);
  if (!response.ok) throw new Error("Failed to fetch teams");
  return await response.json();
};

exports.submitPurchaseRequest = async (orderData) => {
  const response = await fetch("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to submit purchase request: ${errorText}`);
  }

  return await response.json();
};

exports.fetchOrders = async () => {
  const response = await fetch(`/orders`);
  if (!response.ok) throw new Error("Failed to fetch orders");
  return await response.json();
};
