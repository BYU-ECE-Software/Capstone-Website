/**
 * Export functions that do the useEffect.fetch stuff so that we don't have to do it in every component that accesses the server
 */

exports.fetchTeamById = async (id) => {
  const response = await fetch(`/teams/${id}`);
  if (!response.ok) throw new Error("Failed to fetch team");
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

exports.fetchTeamIds = async () => {
    const response = await fetch(`/teams`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    return await response.json();
}

// This endpoint returns all students who have NOT been assigned to a team
exports.fetchAllStudents = async () => {
    const response = await fetch(`/users?role=1`); // prolly don't hardcode
    if (!response.ok) throw new Error('Failed to fetch students');
    return await response.json();
}

// Return all coaches (team or not)
exports.fetchAllCoaches = async () => {
    const response = await fetch(`/users?role=2`); // also don't hardcode
    if (!response.ok) throw new Error('Failed to fetch coaches');
    return await response.json();
}

exports.createTeam = async (formData) => {
    const team = {
        team: formData.team,
        coach: formData.coach,
        students: formData.students,
    };
    const response = await fetch(`/teams/`,
        {
          method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
    );
    if (!response.ok) throw new Error('Failed to create team');
    return await response.json();
}

exports.editTeam = async (teamId, formData) => {
    const response = await fetch(`/teams/${teamId}`,
        {
          method:'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
    );
    if (!response.ok) throw new Error('Failed to update team');
    return await response.json();
}
