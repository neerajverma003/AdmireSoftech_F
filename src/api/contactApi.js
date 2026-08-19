import { apiRequest } from './client';

export const submitContactForm = async (contactPayload) => {
  const backendResult = await apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(contactPayload),
  });

  if (backendResult) return backendResult;

  // Mock response when backend is offline
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    success: true,
    message: `Thank you ${contactPayload.fullName || 'there'}! Your inquiry has been received. Our team will respond within 24 hours.`,
  };
};

export const submitQuickQuote = async (quotePayload) => {
  const backendResult = await apiRequest('/quote', {
    method: 'POST',
    body: JSON.stringify(quotePayload),
  });

  if (backendResult) return backendResult;

  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    success: true,
    message: 'Your project estimate inquiry has been submitted! An account manager will reach out with a detailed proposal.',
  };
};
