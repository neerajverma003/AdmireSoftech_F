import { apiRequest } from './client';

/**
 * Fetch all active FAQs from backend API
 */
export const getActiveFaqs = async (category = '') => {
  try {
    const queryParam = category && category !== 'ALL' && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const response = await apiRequest(`/faqs${queryParam}`);
    const list = response?.faqs || [];
    return list.map((f, index) => ({
      ...f,
      id: f._id || f.id,
      faqNumber: f.faqNumber || String(index + 1).padStart(2, '0'),
    }));
  } catch (err) {
    console.warn('[FaqsApi] Error fetching FAQs from backend:', err.message);
    throw err;
  }
};
