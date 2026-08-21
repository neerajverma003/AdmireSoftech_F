import { apiRequest } from './client';

/**
 * Fetch all approved testimonials from backend API
 */
export const getActiveTestimonials = async (category = '') => {
  try {
    const queryParam = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const response = await apiRequest(`/testimonials${queryParam}`);
    const list = response?.testimonials || [];
    return list.map((t) => ({
      ...t,
      id: t._id || t.id,
      quote: t.content || t.quote,
    }));
  } catch (err) {
    console.warn('[TestimonialsApi] Error fetching testimonials from backend:', err.message);
    throw err;
  }
};

/**
 * Client User submits a new review for moderation
 */
export const submitClientReview = async (reviewData) => {
  try {
    const response = await apiRequest('/testimonials/submit', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
    return response;
  } catch (err) {
    console.warn('[TestimonialsApi] Error submitting review:', err.message);
    throw err;
  }
};
