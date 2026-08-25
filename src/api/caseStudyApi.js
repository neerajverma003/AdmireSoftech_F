import { apiRequest } from './client';

export const defaultCaseStudiesFallback = [
  {
    id: 'cs-1',
    title: 'Global FinTech Microservices & Zero-Downtime Migration',
    slug: 'global-fintech-microservices-migration',
    client: 'Tier-1 Digital Payments Group',
    category: 'Cloud & DevOps',
    badge: 'Enterprise Scale',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    summary: 'Re-architected a legacy monolithic core into high-throughput Kubernetes microservices with zero downtime during live transactions.',
    challenge: 'The client operated a monolithic banking engine processing 40,000 requests/sec with periodic latency spikes and fragile deployments that required 3-hour scheduled maintenance windows.',
    solution: 'Designed and implemented an event-driven AWS EKS architecture utilizing Kafka event streams, automated canary deployments via ArgoCD, and automated multi-region PostgreSQL replication.',
    impactMetrics: [
      { label: 'Uptime SLA', value: '99.995%' },
      { label: 'P99 Latency Cut', value: '68%' },
      { label: 'Deployment Frequency', value: '45x / Day' },
      { label: 'Cloud Cost Cut', value: '$18.5k / mo' },
    ],
    techStack: ['AWS EKS', 'Kubernetes', 'Kafka', 'PostgreSQL', 'ArgoCD', 'Terraform', 'Go'],
    clientQuote: {
      quote: 'Admire Softech delivered a flawless zero-downtime migration on our live core payment rails. Outstanding engineering rigor.',
      author: 'Chief Technology Officer',
      role: 'Global FinTech Leader',
    },
    isFeatured: true,
    isPublished: true,
  },
  {
    id: 'cs-2',
    title: 'Autonomous AI Customer Support & RAG Knowledge Engine',
    slug: 'autonomous-ai-customer-support-rag',
    client: 'Enterprise SaaS Unicorn',
    category: 'AI & Machine Learning',
    badge: 'AI Automation',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    summary: 'Built an autonomous enterprise LLM agent with Pinecone vector search, reducing first-response resolution times by 82%.',
    challenge: 'Support teams were overwhelmed by 120,000+ monthly tickets across 14 languages, resulting in 18-hour average resolution delays and high customer churn.',
    solution: 'Engineered a secure multi-agent RAG workflow with LangChain, Pinecone vector indexing over proprietary documentation, and automated human-in-the-loop escalation.',
    impactMetrics: [
      { label: 'Automated Resolution', value: '74%' },
      { label: 'First Response Time', value: '< 45 sec' },
      { label: 'CSAT Satisfaction', value: '4.85 / 5.0' },
      { label: 'Support OpEx Saved', value: '62%' },
    ],
    techStack: ['Python', 'FastAPI', 'OpenAI GPT-4o', 'Pinecone', 'LangChain', 'Redis', 'Docker'],
    clientQuote: {
      quote: 'The autonomous agent handles over 70% of inquiries with zero human intervention. It fundamentally transformed our support operations.',
      author: 'VP of Product Engineering',
      role: 'Enterprise SaaS Platform',
    },
    isFeatured: true,
    isPublished: true,
  },
  {
    id: 'cs-3',
    title: 'HIPAA-Compliant Real-Time Telemedicine & EHR Suite',
    slug: 'hipaa-compliant-telemedicine-ehr-suite',
    client: 'National Healthcare Network',
    category: 'Healthcare',
    badge: 'Mission Critical',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Delivered a cross-platform WebRTC telemedicine portal and end-to-end encrypted EHR system serving 500,000+ active patients.',
    challenge: 'Outdated legacy desktop systems prevented remote consultations and struggled to comply with updated HIPAA security audit requirements.',
    solution: 'Developed end-to-end encrypted WebRTC HD video consultation rooms, HL7/FHIR medical data synchronization, and biometric-authenticated mobile patient portals.',
    impactMetrics: [
      { label: 'Active Patients', value: '500k+' },
      { label: 'Video Call Success', value: '99.8%' },
      { label: 'Audit Compliance', value: '100% HIPAA' },
      { label: 'Wait Times Cut', value: '75%' },
    ],
    techStack: ['React', 'React Native', 'Node.js', 'WebRTC', 'MongoDB', 'AWS HIPAA Cloud', 'Docker'],
    clientQuote: {
      quote: "Security and compliance were our top priorities. Admire Softech's engineers delivered a rock-solid platform that our doctors and patients love.",
      author: 'Head of Digital Health',
      role: 'National Healthcare Network',
    },
    isFeatured: true,
    isPublished: true,
  },
  {
    id: 'cs-4',
    title: 'Ultra-Low-Latency Real-Time Logistics & Fleet Tracking',
    slug: 'ultra-low-latency-logistics-fleet-tracking',
    client: 'Cross-Border Logistics Network',
    category: 'Enterprise Systems',
    badge: 'IoT & Real-Time',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Engineered an IoT geospatial telemetry pipeline tracking 25,000+ vehicles with sub-second route recalculations.',
    challenge: 'GPS telemetry ingestion bottlenecks caused data loss during peak shipping windows and dispatchers lacked real-time route deviation alerts.',
    solution: 'Built a high-throughput Apache Kafka + Redis Timeseries ingestion cluster with geospatial geofencing engines and automated driver notification channels.',
    impactMetrics: [
      { label: 'Fleet Tracked', value: '25,000+ Assets' },
      { label: 'Telemetry Latency', value: '< 250ms' },
      { label: 'Fuel Cost Saved', value: '18%' },
      { label: 'Delivery Accuracy', value: '99.4%' },
    ],
    techStack: ['Node.js', 'Kafka', 'Redis Streams', 'PostGIS', 'React', 'AWS ECS', 'WebSockets'],
    clientQuote: {
      quote: 'Real-time dispatching with sub-second latency gave us an unbeatable operational advantage across our nationwide fleet.',
      author: 'VP of Logistics Operations',
      role: 'Freight & Transport Network',
    },
    isFeatured: false,
    isPublished: true,
  },
  {
    id: 'cs-5',
    title: 'Multi-Tenant B2B E-Commerce & Inventory Sync Engine',
    slug: 'multi-tenant-b2b-ecommerce-inventory-engine',
    client: 'Global Wholesale Distribution Group',
    category: 'Full-Stack Web & SaaS',
    badge: 'High Throughput',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Built a multi-tenant B2B wholesale portal with live SAP ERP synchronization handling $45M+ in annual transaction volume.',
    challenge: 'Manual Excel-based inventory reconciliation resulted in stockouts, delayed fulfillment, and lost wholesale buyer contracts.',
    solution: 'Architected a Next.js frontend with GraphQL APIs, asynchronous SAP ERP queue sync, and automated tiered pricing calculators.',
    impactMetrics: [
      { label: 'Annual Volume', value: '$45M+' },
      { label: 'Inventory Sync Time', value: '< 2 sec' },
      { label: 'Order Processing', value: '10x Faster' },
      { label: 'Wholesale Buyers', value: '3,800+' },
    ],
    techStack: ['Next.js', 'TypeScript', 'GraphQL', 'Node.js', 'PostgreSQL', 'Redis', 'TailwindCSS'],
    clientQuote: {
      quote: 'Our wholesale customers now experience instant checkout with live pricing. Order turnaround improved ten-fold.',
      author: 'Managing Director',
      role: 'Global Wholesale Distributor',
    },
    isFeatured: false,
    isPublished: true,
  },
  {
    id: 'cs-6',
    title: 'Zero-Trust Cybersecurity Hardening & Penetration Defense',
    slug: 'zero-trust-cybersecurity-hardening',
    client: 'FinTech Banking Infrastructure',
    category: 'Cybersecurity & Audit',
    badge: 'Zero-Trust',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    summary: 'Implemented SOC-2 Type II compliant zero-trust perimeter, automated secret rotation, and AWS GuardDuty security automation.',
    challenge: 'Expanding cloud footprint exposed API endpoints to malicious DDoS attacks and credential stuffing attempts.',
    solution: 'Configured Cloudflare Enterprise WAF with rate-limiting, AWS IAM least-privilege policies, HashiCorp Vault secrets rotation, and automated vulnerability scanning.',
    impactMetrics: [
      { label: 'Attacks Mitigated', value: '100%' },
      { label: 'SOC-2 Compliance', value: 'Type II Certified' },
      { label: 'Vulnerability MTTR', value: '< 4 Hours' },
      { label: 'Audit Score', value: 'Grade A+' },
    ],
    techStack: ['AWS WAF', 'HashiCorp Vault', 'Kubernetes NetworkPolicies', 'GuardDuty', 'Terraform'],
    clientQuote: {
      quote: "Admire Softech's cybersecurity audit and hardening gave our institutional banking partners complete peace of mind.",
      author: 'Chief Information Security Officer',
      role: 'FinTech Banking Infrastructure',
    },
    isFeatured: false,
    isPublished: true,
  },
];

/**
 * Fetch published case studies from backend with local fallback
 */
export const getActiveCaseStudies = async (category = '') => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('isPublished', 'true');
    queryParams.append('sort', 'createdAt');
    queryParams.append('order', 'desc');
    if (category && category !== 'All') {
      queryParams.append('category', category);
    }

    const response = await apiRequest(`/case-studies?${queryParams.toString()}`);
    const list = response?.data || response?.caseStudies;
    if (Array.isArray(list) && list.length > 0) {
      return list.map((item) => ({
        ...item,
        id: item._id || item.id,
      }));
    }
    return defaultCaseStudiesFallback;
  } catch (err) {
    console.warn('[CaseStudyApi] Failed to fetch live case studies, using fallback:', err.message);
    return defaultCaseStudiesFallback;
  }
};

/**
 * Fetch single case study by Slug or ID
 */
export const getCaseStudyBySlug = async (slugOrId) => {
  try {
    const response = await apiRequest(`/case-studies/${slugOrId}`);
    const item = response?.data || response?.caseStudy;
    return item ? { ...item, id: item._id || item.id } : null;
  } catch (err) {
    console.warn('[CaseStudyApi] Error fetching case study by slug:', err.message);
    return defaultCaseStudiesFallback.find((c) => c.slug === slugOrId || c.id === slugOrId) || null;
  }
};
