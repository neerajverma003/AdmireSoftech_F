import { Cloud, BarChart3, ShieldCheck, Cpu, Server, Code2 } from 'lucide-react';

export const servicesData = [
  {
    id: 'cloud-services',
    icon: Cloud,
    title: 'Cloud Services',
    description: 'Scalable, secure and reliable cloud solutions tailored for your modern business needs.',
    link: '#cloud-services',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'data-analytics',
    icon: BarChart3,
    title: 'Data & Analytics',
    description: 'Transform raw data into actionable insights and drive smarter business decisions.',
    link: '#data-analytics',
    color: 'from-cyan-400 to-teal-400'
  },
  {
    id: 'cyber-security',
    icon: ShieldCheck,
    title: 'Cyber Security',
    description: 'Protect your digital assets with enterprise-grade security and compliance solutions.',
    link: '#cyber-security',
    color: 'from-blue-600 to-indigo-400'
  },
  {
    id: 'digital-transformation',
    icon: Cpu,
    title: 'Digital Transformation',
    description: 'Modernize your core processes and deliver exceptional customer digital experiences.',
    link: '#digital-transformation',
    color: 'from-sky-400 to-blue-500'
  },
  {
    id: 'managed-it',
    icon: Server,
    title: 'Managed IT Services',
    description: 'Proactive 24/7 infrastructure management, cloud monitoring, and dedicated IT support.',
    link: '#managed-it',
    color: 'from-teal-400 to-emerald-500'
  },
  {
    id: 'product-engineering',
    icon: Code2,
    title: 'Product Engineering',
    description: 'End-to-end custom software product development from initial architectural design to deployment.',
    link: '#product-engineering',
    color: 'from-indigo-500 to-cyan-400'
  }
];
