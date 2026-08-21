import { apiRequest } from './client';

/**
 * Fetch all active team members from backend API
 */
export const getActiveTeamMembers = async (department = '', isFeatured = undefined) => {
  try {
    const params = new URLSearchParams();
    if (department && department !== 'ALL' && department !== 'All' && department !== 'all') {
      params.append('department', department);
    }
    if (isFeatured !== undefined) {
      params.append('isFeatured', isFeatured);
    }

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await apiRequest(`/team${queryString}`);
    const list = response?.team || [];
    return list.map((m) => ({
      ...m,
      id: m._id || m.id,
      avatarImg: m.avatarImg || m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    }));
  } catch (err) {
    console.warn('[TeamApi] Error fetching team members from backend:', err.message);
    throw err;
  }
};
