import { apiRequest } from './client';

// Default offline fallback configuration
export const DEFAULT_ESTIMATOR_CONFIG = {
  header: {
    title: 'Instant Project Estimator',
    subtitle: 'Architecting Future-Ready Cloud, AI & Enterprise Software',
    badge: 'Direct Architect Access',
    avgResponseTime: '< 2 hours',
  },
  services: [
    {
      id: 'web-saas',
      title: 'Web & SaaS Development',
      desc: 'Custom web apps, platforms & portals',
      iconName: 'Code2',
      isEnabled: true,
      order: 1,
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      desc: 'LLM agents, vector DBs & automation',
      iconName: 'Cpu',
      isEnabled: true,
      order: 2,
    },
    {
      id: 'devops-cloud',
      title: 'DevOps & Cloud Automation',
      desc: 'AWS, Kubernetes & CI/CD pipelines',
      iconName: 'Cloud',
      isEnabled: true,
      order: 3,
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      desc: 'iOS, Android & React Native apps',
      iconName: 'Smartphone',
      isEnabled: true,
      order: 4,
    },
    {
      id: 'security-audit',
      title: 'Cybersecurity & Audit',
      desc: 'Pen-testing, compliance & zero-trust',
      iconName: 'ShieldCheck',
      isEnabled: true,
      order: 5,
    },
  ],
  scopes: [
    {
      id: 'mvp-initial',
      title: 'MVP / Initial Release',
      subtitle: 'Core features, agile prototype launch',
      estPrice: '₹50k - ₹1.5 Lakhs',
      minPrice: 50000,
      maxPrice: 150000,
      currency: 'INR',
      badge: 'Popular',
      isEnabled: true,
      order: 1,
    },
    {
      id: 'enterprise-system',
      title: 'Full Enterprise System',
      subtitle: 'Production scale, high-throughput SLAs',
      estPrice: '₹2.5 Lakhs - ₹7.5 Lakhs',
      minPrice: 250000,
      maxPrice: 750000,
      currency: 'INR',
      badge: 'Enterprise',
      isEnabled: true,
      order: 2,
    },
    {
      id: 'legacy-modernization',
      title: 'Legacy Modernization & Cloud',
      subtitle: 'Microservices migration, infra overhaul',
      estPrice: '₹1.5 Lakhs - ₹4 Lakhs',
      minPrice: 150000,
      maxPrice: 400000,
      currency: 'INR',
      badge: '',
      isEnabled: true,
      order: 3,
    },
  ],
  timelines: [
    { id: 't-1-2m', label: '1 - 2 Months', note: 'Fast-track Sprint', isEnabled: true, order: 1 },
    { id: 't-3-6m', label: '3 - 6 Months', note: 'Standard Delivery', isEnabled: true, order: 2 },
    { id: 't-6m-plus', label: '6+ Months', note: 'Strategic Roadmap', isEnabled: true, order: 3 },
  ],
  contactModalConfig: {
    title: "Let's Build Something Amazing",
    subtitle: 'Share your project vision or technical requirements with our engineering leaders.',
    badge: 'Direct Architect Access',
    budgetRanges: ['< ₹50k', '₹50k - ₹1.5L', '₹1.5L - ₹5L', '₹5L - ₹15L', '₹15L+'],
    servicesList: [
      'DevOps & Cloud Automation',
      'AI & Machine Learning',
      'Full-Stack Web & SaaS',
      'Mobile App Development',
      'Cybersecurity & Audit',
      'Dedicated IT Staffing',
      'General IT Consultation',
    ],
  },
  fieldSettings: {
    requirePhone: false,
    minMessageLength: 10,
    requireAuthForQuote: false,
  },
};

/**
 * Fetch dynamic Estimator & Quote Form Configuration
 */
export async function getEstimatorConfig(forceRefresh = true) {
  try {
    const response = await apiRequest('/estimator-config');
    if (response?.config) {
      const mergedConfig = {
        ...DEFAULT_ESTIMATOR_CONFIG,
        ...response.config,
        header: { ...DEFAULT_ESTIMATOR_CONFIG.header, ...(response.config.header || {}) },
        contactModalConfig: {
          ...DEFAULT_ESTIMATOR_CONFIG.contactModalConfig,
          ...(response.config.contactModalConfig || {}),
        },
        fieldSettings: {
          ...DEFAULT_ESTIMATOR_CONFIG.fieldSettings,
          ...(response.config.fieldSettings || {}),
        },
      };
      return mergedConfig;
    }
  } catch (error) {
    console.warn('[EstimatorConfig] Falling back to default offline configuration:', error.message);
  }

  return DEFAULT_ESTIMATOR_CONFIG;
}
