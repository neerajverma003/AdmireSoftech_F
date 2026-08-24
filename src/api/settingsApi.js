import { API_BASE_URL } from './client';

export const fallbackSettings = {
  companyName: 'Admire Softech Pvt. Ltd.',
  tagline: 'Architecting Future-Ready Cloud, AI & Enterprise Software',
  contactEmail: 'contact@admiresoftech.com',
  supportEmail: 'support@admiresoftech.com',
  contactPhone: '+91 (120) 456-7890',
  whatsappNumber: '+91 98765 43210',
  headquarters: 'Sector 62, Noida, NCR, India',
  workingHours: 'Mon - Fri: 9:00 AM - 6:00 PM IST',
  websiteUrl: 'https://admiresoftech.com',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/admiresoftech',
    twitter: 'https://twitter.com/admiresoftech',
    github: 'https://github.com/admiresoftech',
    youtube: 'https://youtube.com/@admiresoftech',
    instagram: 'https://instagram.com/admiresoftech',
    facebook: '',
    discord: '',
  },
  stats: {
    totalProjects: '500+',
    uptimeSLA: '99.9%',
    clientSatisfaction: '98%',
    globalEnterprises: '45+',
  },
};

/**
 * Fetch company settings and social media links with graceful fallback
 */
export const getCompanySettings = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data?.settings || fallbackSettings;
  } catch (error) {
    console.warn('[settingsApi] Failed to fetch live settings, using fallback defaults:', error.message);
    return fallbackSettings;
  }
};
