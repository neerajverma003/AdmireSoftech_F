import { apiRequest } from './client';

/**
 * Submit a project quote request
 * (Requires authenticated user JWT token)
 */
export const submitQuoteRequest = async (quoteData) => {
  return await apiRequest('/quotes', {
    method: 'POST',
    body: JSON.stringify(quoteData),
  });
};
