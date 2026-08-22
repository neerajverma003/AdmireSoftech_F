import { apiRequest } from './client';

/**
 * Fetch all active freelance gigs from backend
 */
export const getActiveFreelanceGigs = async (category = '') => {
  try {
    const queryParam = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const response = await apiRequest(`/freelance${queryParam}`);
    const list = response?.gigs || response?.freelance || [];
    return list.map((g) => ({
      ...g,
      id: g._id || g.id,
    }));
  } catch (err) {
    console.warn('[FreelanceApi] Error fetching freelance gigs:', err.message);
    throw err;
  }
};

/**
 * Fetch a single freelance gig by ID
 */
export const getFreelanceGigById = async (id) => {
  try {
    const response = await apiRequest(`/freelance/${id}`);
    const gig = response?.gig;
    if (!gig) return null;
    return {
      ...gig,
      id: gig._id || gig.id,
    };
  } catch (err) {
    console.warn(`[FreelanceApi] Error fetching gig ${id}:`, err.message);
    throw err;
  }
};

/**
 * Submit contractor proposal / application for a freelance gig
 */
export const submitFreelanceProposal = async (gigId, proposalData) => {
  try {
    const response = await apiRequest(`/freelance/${gigId}/proposals`, {
      method: 'POST',
      body: JSON.stringify(proposalData),
    });
    return response;
  } catch (err) {
    console.warn('[FreelanceApi] Error submitting contractor proposal:', err.message);
    throw err;
  }
};
