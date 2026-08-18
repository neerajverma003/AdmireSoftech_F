import { Stethoscope, Landmark, ShoppingBag, Cpu, Truck, GraduationCap } from 'lucide-react';

export const industriesData = [
  {
    id: 'fintech',
    title: 'FinTech & Banking',
    description: 'High-speed payment gateways, secure banking portals, and AI fraud prevention systems.',
    icon: Landmark,
    accent: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Pharma',
    description: 'HIPAA-compliant platforms, tele-medicine solutions, and patient data analytics.',
    icon: Stethoscope,
    accent: 'from-teal-400 to-emerald-500'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Retail',
    description: 'Scalable multi-tenant e-commerce engines, real-time inventory and headless retail.',
    icon: ShoppingBag,
    accent: 'from-cyan-400 to-blue-600'
  },
  {
    id: 'hi-tech',
    title: 'Hi-Tech & SaaS',
    description: 'Next-gen enterprise software, automated CI/CD pipelines, and cloud native architectures.',
    icon: Cpu,
    accent: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    description: 'IoT tracking systems, fleet routing optimization, and automated warehouse management.',
    icon: Truck,
    accent: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'education',
    title: 'EdTech & Learning',
    description: 'Interactive remote learning platforms, student management systems, and gamified courses.',
    icon: GraduationCap,
    accent: 'from-teal-500 to-blue-400'
  }
];
