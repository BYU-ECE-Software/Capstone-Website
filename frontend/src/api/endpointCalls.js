/**
 * Export functions that do the useEffect.fetch stuff so that we don't have to do it in every component that accesses the server
 */

exports.fetchTeamById = async (id) => {
    const response = await fetch(`/teams/${id}`);
    if (!response.ok) throw new Error('Failed to fetch team');
    return await response.json();
}

exports.fetchTeamIds = async () => {
    const response = await fetch(`/teams`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    return await response.json();
}