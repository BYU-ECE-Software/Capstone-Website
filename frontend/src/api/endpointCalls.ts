/**
 * Import the datatypes used by the frontend
 */

import { Coach } from "../types/coach";
import { Student } from "../types/student";
import { Team } from "../types/team";
import { TeamId } from "../types/teamId";

/**
 * Export functions that do the useEffect.fetch stuff so that we don't have to do it in every component that accesses the server
 */

export async function fetchTeamById(id: number): Promise<Team> {
  const response = await fetch(`/teams/${id}`);
  if (!response.ok) throw new Error("Failed to fetch team");
  return await response.json();
};

// WAIT FOR LARA's updated tested code.
export async function submitPurchaseRequest(orderData: any): Promise<any> {
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

export async function fetchOrders() {
  const response = await fetch(`/orders`);
  if (!response.ok) throw new Error("Failed to fetch orders");
  return await response.json();
};

export async function fetchTeamIds(): Promise<TeamId[]> {
    const response = await fetch(`/teams`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    return await response.json();
}

// This endpoint returns all students who have NOT been assigned to a team
export async function fetchAllStudents(): Promise<Student[]> {
    const response = await fetch(`/users?role=1`); // prolly don't hardcode
    if (!response.ok) throw new Error('Failed to fetch students');
    return await response.json();
}

// Return all coaches (team or not)
export async function fetchAllCoaches(): Promise<Coach[]> {
    const response = await fetch(`/users?role=2`); // also don't hardcode
    if (!response.ok) throw new Error('Failed to fetch coaches');
    return await response.json();
}

export async function createTeam(formData: Team): Promise<any> {
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

export async function editTeam(teamId: number, formData: Team): Promise<any> {
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

export async function deleteTeam(teamId: number): Promise<any> {
  try {
    const response = await fetch(`/teams/${teamId}`,
      {
        method:'DELETE',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    if (!response.ok) throw new Error('Failed to delete team');
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}
