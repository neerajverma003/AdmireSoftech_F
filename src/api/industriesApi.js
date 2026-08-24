import { apiRequest } from './client';
import { industriesList } from '../data/industriesData';


export const getActiveIndustries = async (category = '') => {
  try {
    const queryParam = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const response = await apiRequest(`/industries${queryParam}`);
    const list = response?.industries;
    if (Array.isArray(list) && list.length > 0) {
      return list.map((item) => ({
        ...item,
        id: item._id || item.id,
      }));
    }
    // Fallback if empty array
    return industriesList;
  } catch (err) {
    console.warn('[IndustriesApi] Failed to fetch live industries, using local fallback:', err.message);
    return industriesList;
  }
};


export const getIndustryById = async (id) => {
  try {
    const response = await apiRequest(`/industries/${id}`);
    const industry = response?.industry;
    return industry ? { ...industry, id: industry._id || industry.id } : null;
  } catch (err) {
    console.warn('[IndustriesApi] Error fetching industry by ID:', err.message);
    return industriesList.find((i) => i.id === id || i._id === id) || null;
  }
};
