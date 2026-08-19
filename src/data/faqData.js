export const FAQ_DATA = [
  {
    id: '01',
    category: 'Engineering & Tech',
    question: 'How do you ensure enterprise code quality and architecture scalability?',
    answer:
      'We adhere to clean architecture principles, strict static typing, automated CI/CD pipelines, and zero-downtime containerized deployments.',
    highlights: [
      'Comprehensive automated unit, integration & end-to-end testing suites',
      'Peer-reviewed pull request workflows & static security audits',
      'Horizontal auto-scaling microservices with Kubernetes & Terraform',
    ],
  },
  {
    id: '02',
    category: 'Engineering & Tech',
    question: 'Can you modernize our legacy application without disrupting live business operations?',
    answer:
      'Yes. We utilize the Strangler Fig pattern and microservices decoupling to incrementally modernize legacy monolithic backends into cloud-native microservices.',
    highlights: [
      'Zero-downtime database replication & canary deployments',
      'Incremental phased rollouts without operational downtime',
      'Backward-compatible REST & GraphQL API gateway bridges',
    ],
  },
  {
    id: '03',
    category: 'Security & NDA',
    question: 'Do you sign Non-Disclosure Agreements (NDAs) and ensure IP ownership?',
    answer:
      'Absolutely. We sign strict mutual NDAs prior to any technical architecture discussions. 100% of the code, intellectual property, repositories, and cloud deployment credentials belong exclusively to you upon delivery.',
    highlights: [
      'Full legal IP assignment and copyright transfer upon milestone completion',
      'Strict source-code repository isolation & access audit trails',
      'Encrypted secrets management with zero shared credentials',
    ],
  },
  {
    id: '04',
    category: 'Security & NDA',
    question: 'What security standards and compliance frameworks do you adhere to?',
    answer:
      'Our solutions are engineered with Zero-Trust architecture, end-to-end encryption (TLS 1.3 & AES-256), OWASP Top 10 mitigation, and compliance readiness.',
    highlights: [
      'SOC 2 Type II, HIPAA, and GDPR compliance readiness',
      'Automated vulnerability scanning & third-party penetration testing',
      'Role-Based Access Control (RBAC) and OAuth 2.0 / OpenID Connect',
    ],
  },
  {
    id: '05',
    category: 'Process & Timelines',
    question: 'What is the typical turnaround time for an MVP or enterprise release?',
    answer:
      'Production-ready MVPs are delivered in 4 to 8 weeks through rapid bi-weekly agile sprints. Enterprise-scale platforms typically span 3 to 6 months.',
    highlights: [
      'Bi-weekly live milestone sprint demos with working code increments',
      'Continuous deployment staging environment for your immediate review',
      'Transparent velocity tracking via Jira / Linear Kanban boards',
    ],
  },
  {
    id: '06',
    category: 'Process & Timelines',
    question: 'How do you handle project management, updates, and communication?',
    answer:
      'You are assigned a dedicated Solution Architect and Project Lead with direct communication channels and transparent real-time updates.',
    highlights: [
      'Dedicated private Slack / Microsoft Teams workspace channels',
      'Weekly architectural sprint planning & async video walkthroughs',
      'Guaranteed < 2-hour response window during core business hours',
    ],
  },
  {
    id: '07',
    category: 'Pricing & Engagement',
    question: 'What engagement models do you offer for software development?',
    answer:
      'We offer flexible engagement models tailored to your roadmap, technical requirements, and budgetary milestones.',
    highlights: [
      'Fixed-Price Milestone Contracts for well-defined project scopes',
      'Dedicated Agile Engineering Pods for continuous product scaling',
      'Time & Materials model for high-velocity exploratory R&D initiatives',
    ],
  },
  {
    id: '08',
    category: 'Pricing & Engagement',
    question: 'Do you offer ongoing post-launch maintenance and 24/7 SLA support?',
    answer:
      'Yes. We provide continuous maintenance packages including 24/7 cloud infrastructure monitoring, security patching, and on-call SRE incident response.',
    highlights: [
      '99.99% uptime SLAs with automated telemetry alerts & Datadog monitoring',
      'Monthly performance profiling, database index tuning, and dependency updates',
      'Priority ticket resolution with dedicated Site Reliability Engineers',
    ],
  },
];
