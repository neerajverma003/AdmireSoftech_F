import { apiRequest } from './client';

/**
 * Fetch all active services from backend API
 */
export const getActiveServices = async (category = '') => {
  try {
    const queryParam = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const response = await apiRequest(`/services${queryParam}`);
    const list = response?.services || [];
    return list.map((s) => ({
      ...s,
      id: s._id || s.id,
    }));
  } catch (err) {
    console.warn('[ServicesApi] Error fetching services from backend:', err.message);
    throw err;
  }
};

/**
 * Get single service details by ID
 */
export const getServiceById = async (id) => {
  try {
    const response = await apiRequest(`/services/${id}`);
    const service = response?.service;
    return service ? { ...service, id: service._id || service.id } : null;
  } catch (err) {
    console.warn('[ServicesApi] Error fetching service by ID:', err.message);
    throw err;
  }
};
