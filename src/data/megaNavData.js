import {
  Layers,
  Users,
  Sparkles,
  Code2,
  Building2,
  Video,
  FileCheck2,
  Gauge,
  Calculator,
  FileText,
  Briefcase,
  Handshake,
  Mail,
  HelpCircle,
  BookOpen,
} from 'lucide-react';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * METEOROPS-STYLE 2-COLUMN MEGA NAVIGATION DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * Each dropdown is split into 2 clear parts:
 *  - leftCol: Main category items with title & subtitle
 *  - rightCol: Stacked sub-sections (section1 + section2) with clean icon + label
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const megaNavData = [
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    hasDropdown: true,
    dropdownWidth: 'w-[470px]',
    leftCol: {
      title: 'Work with us',
      items: [
        {
          title: 'All services',
          subtitle: 'Find the right help',
          href: '/services',
          icon: Layers,
        },
        {
          title: 'Ways to engage',
          subtitle: 'Hourly, hours bank, or monthly',
          href: '/contact',
          icon: Users,
        },
      ],
    },
    rightCol: {
      section1: {
        title: 'Browse by',
        items: [
          { title: 'Solutions', href: '/solutions', icon: Sparkles },
          { title: 'Technologies', href: '/technologies', icon: Code2 },
          { title: 'Industries', href: '/industries', icon: Building2 },
        ],
      },
      section2: {
        title: 'Start free',
        items: [
          {
            title: 'Meet a senior engineer',
            href: '/contact',
            icon: Video,
          },
          { title: 'Free assessments', href: '/services', icon: FileCheck2 },
          { title: 'The DevOps audit', href: '/services', icon: Gauge },
          {
            title: 'Project estimation',
            href: '#estimator',
            icon: Calculator,
            actionType: 'modal',
          },
        ],
      },
    },
  },
  {
    id: 'company',
    label: 'Company',
    href: '/about',
    hasDropdown: true,
    dropdownWidth: 'w-[470px]',
    leftCol: {
      title: 'The company',
      items: [
        {
          title: 'About',
          subtitle: 'Who we are and how we work',
          href: '/about',
          icon: Building2,
        },
        {
          title: 'Case studies',
          subtitle: 'Outcomes we have delivered',
          href: '/#brands',
          icon: FileText,
        },
        {
          title: 'The team',
          subtitle: 'The people behind Admire Softech',
          href: '/team',
          icon: Users,
        },
        {
          title: 'Our engineers',
          subtitle: 'Meet the senior bench',
          href: '/team',
          icon: Code2,
        },
      ],
    },
    rightCol: {
      section1: {
        title: 'Join us',
        items: [
          { title: 'Careers', href: '/careers', icon: Briefcase },
          { title: 'Freelance with us', href: '/freelance', icon: Handshake },
        ],
      },
      section2: {
        title: 'Get in touch',
        items: [
          { title: 'Contact', href: '/contact', icon: Mail },
        ],
      },
    },
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/faq',
    hasDropdown: true,
    dropdownWidth: 'w-[430px]',
    leftCol: {
      title: 'Knowledge',
      items: [
        {
          title: 'Frequently asked questions',
          subtitle: 'Contracts, security & SLAs',
          href: '/faq',
          icon: HelpCircle,
        },
        {
          title: 'Architecture guides',
          subtitle: 'Cloud & microservices playbooks',
          href: '/services',
          icon: BookOpen,
        },
      ],
    },
    rightCol: {
      section1: {
        title: 'Free tools',
        items: [
          {
            title: 'Project estimator',
            href: '#estimator',
            icon: Calculator,
            actionType: 'modal',
          },
          {
            title: 'DevOps maturity check',
            href: '/services',
            icon: Gauge,
          },
        ],
      },
    },
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '#estimator',
    actionType: 'modal',
    hasDropdown: false,
  },
];
