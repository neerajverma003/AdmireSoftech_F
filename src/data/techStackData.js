/* -------------------------------------------------------------------------- */
/* TECH STACK LOGO CDN MAPPINGS & DATA                                        */
/* -------------------------------------------------------------------------- */

export const LOGOS = {
  react:        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  nextjs:       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  vuejs:        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  nodejs:       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  express:      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  spring:       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
  javascript:   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  typescript:   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  python:       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  java:         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  mongodb:      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  postgresql:   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  tailwind:     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  graphql:      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  flutter:      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  swift:        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
  kotlin:       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
  aws:          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  docker:       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  kubernetes:   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  git:          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  terraform:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
  nginx:        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  pytorch:      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  tensorflow:   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  php:          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  mysql:        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  firebase:     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  redux:        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  solidity:     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg',
  google:       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
  salesforce:   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg',
};

export const categories = [
  { id: 'web', label: 'Web Dev' },
  { id: 'app', label: 'App Dev' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'marketing', label: 'Digital Marketing' },
  { id: 'salesforce', label: 'Salesforce' },
];

export const categoryData = {
  web: [
    { name: 'React', badge: 'FRONTEND', percentage: 95, color: 'from-cyan-500 to-blue-500', logoKey: 'react' },
    { name: 'Next.js', badge: 'FRONTEND', percentage: 90, color: 'from-slate-300 to-slate-500', logoKey: 'nextjs' },
    { name: 'Vue.js', badge: 'FRONTEND', percentage: 88, color: 'from-emerald-400 to-teal-600', logoKey: 'vuejs' },
    { name: 'Node.js', badge: 'BACKEND', percentage: 92, color: 'from-green-500 to-emerald-600', logoKey: 'nodejs' },
    { name: 'Express.js', badge: 'BACKEND', percentage: 88, color: 'from-slate-300 to-slate-500', logoKey: 'express' },
    { name: 'Spring Boot', badge: 'BACKEND', percentage: 85, color: 'from-green-400 to-emerald-500', logoKey: 'spring' },
    { name: 'JavaScript', badge: 'LANGUAGE', percentage: 98, color: 'from-yellow-400 to-amber-500', logoKey: 'javascript' },
    { name: 'TypeScript', badge: 'LANGUAGE', percentage: 90, color: 'from-blue-400 to-indigo-600', logoKey: 'typescript' },
    { name: 'Python', badge: 'LANGUAGE', percentage: 88, color: 'from-blue-500 to-yellow-500', logoKey: 'python' },
    { name: 'Java', badge: 'LANGUAGE', percentage: 85, color: 'from-orange-500 to-red-600', logoKey: 'java' },
    { name: 'MongoDB', badge: 'DATABASE', percentage: 88, color: 'from-emerald-500 to-green-600', logoKey: 'mongodb' },
    { name: 'PostgreSQL', badge: 'DATABASE', percentage: 85, color: 'from-blue-400 to-cyan-600', logoKey: 'postgresql' },
    { name: 'Tailwind CSS', badge: 'STYLING', percentage: 95, color: 'from-cyan-400 to-blue-600', logoKey: 'tailwind' },
    { name: 'GraphQL', badge: 'API', percentage: 80, color: 'from-pink-500 to-rose-600', logoKey: 'graphql' },
  ],
  app: [
    { name: 'React Native', badge: 'CROSS-PLATFORM', percentage: 94, color: 'from-cyan-400 to-blue-600', logoKey: 'react' },
    { name: 'Flutter', badge: 'CROSS-PLATFORM', percentage: 88, color: 'from-blue-400 to-cyan-500', logoKey: 'flutter' },
    { name: 'Swift (iOS)', badge: 'NATIVE', percentage: 85, color: 'from-orange-500 to-red-500', logoKey: 'swift' },
    { name: 'Kotlin (Android)', badge: 'NATIVE', percentage: 87, color: 'from-purple-500 to-indigo-600', logoKey: 'kotlin' },
    { name: 'JavaScript', badge: 'LANGUAGE', percentage: 95, color: 'from-yellow-400 to-amber-500', logoKey: 'javascript' },
    { name: 'Firebase', badge: 'BACKEND', percentage: 84, color: 'from-amber-400 to-orange-600', logoKey: 'firebase' },
  ],
  cloud: [
    { name: 'AWS Cloud', badge: 'INFRASTRUCTURE', percentage: 92, color: 'from-amber-500 to-orange-600', logoKey: 'aws' },
    { name: 'Docker', badge: 'CONTAINER', percentage: 90, color: 'from-blue-400 to-cyan-600', logoKey: 'docker' },
    { name: 'Kubernetes', badge: 'ORCHESTRATION', percentage: 85, color: 'from-blue-500 to-indigo-600', logoKey: 'kubernetes' },
    { name: 'Terraform', badge: 'IAC', percentage: 82, color: 'from-purple-400 to-indigo-600', logoKey: 'terraform' },
    { name: 'Nginx', badge: 'WEB SERVER', percentage: 88, color: 'from-green-500 to-emerald-700', logoKey: 'nginx' },
    { name: 'Git & CI/CD', badge: 'DEVOPS', percentage: 94, color: 'from-orange-400 to-red-600', logoKey: 'git' },
  ],
  ai: [
    { name: 'Python', badge: 'LANGUAGE', percentage: 95, color: 'from-blue-500 to-yellow-500', logoKey: 'python' },
    { name: 'PyTorch', badge: 'DEEP LEARNING', percentage: 84, color: 'from-orange-500 to-red-600', logoKey: 'pytorch' },
    { name: 'TensorFlow', badge: 'ML FRAMEWORK', percentage: 82, color: 'from-amber-500 to-orange-500', logoKey: 'tensorflow' },
    { name: 'JavaScript', badge: 'AI AGENTS', percentage: 90, color: 'from-yellow-400 to-amber-500', logoKey: 'javascript' },
    { name: 'MySQL', badge: 'DATABASE', percentage: 86, color: 'from-blue-400 to-cyan-600', logoKey: 'mysql' },
    { name: 'Firebase', badge: 'DATA SCIENCE', percentage: 85, color: 'from-amber-400 to-orange-600', logoKey: 'firebase' },
  ],
  blockchain: [
    { name: 'Solidity', badge: 'SMART CONTRACTS', percentage: 86, color: 'from-slate-300 to-slate-500', logoKey: 'solidity' },
    { name: 'JavaScript', badge: 'WEB3 SDK', percentage: 85, color: 'from-yellow-400 to-amber-500', logoKey: 'javascript' },
    { name: 'Python', badge: 'SCRIPTING', percentage: 82, color: 'from-blue-500 to-yellow-500', logoKey: 'python' },
    { name: 'TypeScript', badge: 'DEV TOOLING', percentage: 82, color: 'from-blue-400 to-indigo-600', logoKey: 'typescript' },
  ],
  marketing: [
    { name: 'Google Analytics', badge: 'ANALYTICS', percentage: 92, color: 'from-amber-400 to-orange-500', logoKey: 'google' },
    { name: 'Firebase', badge: 'TRACKING', percentage: 88, color: 'from-amber-400 to-orange-600', logoKey: 'firebase' },
    { name: 'JavaScript', badge: 'AUTOMATION', percentage: 90, color: 'from-yellow-400 to-amber-500', logoKey: 'javascript' },
    { name: 'Python', badge: 'DATA ANALYSIS', percentage: 85, color: 'from-blue-500 to-yellow-500', logoKey: 'python' },
  ],
  salesforce: [
    { name: 'Salesforce', badge: 'CRM PLATFORM', percentage: 90, color: 'from-cyan-400 to-blue-600', logoKey: 'salesforce' },
    { name: 'JavaScript', badge: 'CUSTOM CODE', percentage: 88, color: 'from-yellow-400 to-amber-500', logoKey: 'javascript' },
    { name: 'Java', badge: 'APEX BACKEND', percentage: 86, color: 'from-orange-500 to-red-600', logoKey: 'java' },
    { name: 'Python', badge: 'AUTOMATION', percentage: 85, color: 'from-blue-500 to-yellow-500', logoKey: 'python' },
  ],
};

export const innerOrbitTechs = [
  { name: 'React', logoKey: 'react', bg: 'border-cyan-500/50' },
  { name: 'Node.js', logoKey: 'nodejs', bg: 'border-emerald-500/50' },
  { name: 'Python', logoKey: 'python', bg: 'border-blue-500/50' },
  { name: 'TypeScript', logoKey: 'typescript', bg: 'border-blue-600/50' },
  { name: 'AWS', logoKey: 'aws', bg: 'border-amber-500/50' },
  { name: 'Docker', logoKey: 'docker', bg: 'border-sky-500/50' },
];

export const outerOrbitTechs = [
  { name: 'Next.js', logoKey: 'nextjs', bg: 'border-slate-600' },
  { name: 'Vue.js', logoKey: 'vuejs', bg: 'border-emerald-500/50' },
  { name: 'MongoDB', logoKey: 'mongodb', bg: 'border-green-500/50' },
  { name: 'PostgreSQL', logoKey: 'postgresql', bg: 'border-blue-400/50' },
  { name: 'Java', logoKey: 'java', bg: 'border-orange-500/50' },
  { name: 'Tailwind CSS', logoKey: 'tailwind', bg: 'border-cyan-400/50' },
  { name: 'GraphQL', logoKey: 'graphql', bg: 'border-pink-500/50' },
  { name: 'Kubernetes', logoKey: 'kubernetes', bg: 'border-indigo-500/50' },
];
