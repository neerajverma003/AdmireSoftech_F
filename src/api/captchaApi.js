import { API_BASE_URL } from './client';

/**
 * Fetch a fresh security CAPTCHA challenge
 * Returns { success: boolean, captchaToken: string, captchaSvg: string }
 */
export const getCaptchaChallenge = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/captcha`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch captcha challenge: HTTP ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('[Captcha API] Error fetching captcha challenge:', err);
    throw err;
  }
};
