import type { Project } from './types'

export const PROJECTS: Project[] = [
  {
    id: 'agentshield',
    title: 'AgentShield',
    category: 'AI Security | Agent Authorization',
    shortDescription:
      'AI Agent Security and Privacy Protection Platform designed to prevent untrusted content from triggering unauthorized agent actions.',
    problemSolved:
      'Autonomous AI agents with tool execution access risk exposing sensitive data, suffering prompt injection, or making unauthorized API calls.',
    technicalApproach:
      'Architected a deterministic authorization gateway with RBAC and ABAC policy enforcement, Pydantic action validation, Microsoft Presidio privacy filtering, and Sarvam AI integration.',
    stack: ['React', 'Python FastAPI', 'Pydantic', 'Microsoft Presidio', 'Sarvam AI', 'SQLite'],
    contribution: 'Authorization gateway, policy enforcement engine & security infrastructure.',
    accent: '#F97316',
    accentSoft: 'rgba(249, 115, 22, 0.15)',
    github: 'https://github.com/surajsrinivas27/Agentshield',
    context: 'Sarvam AI Hackathon',
    featured: true,
  },
  {
    id: 'safepay-sentinel',
    title: 'SafePay Sentinel',
    category: 'AI/ML | Financial Fraud Detection',
    shortDescription:
      'Real-Time Graph Intelligence for Financial Fraud Detection and Risk-Aware Intervention.',
    problemSolved:
      'Legacy fraud detection systems fail to detect complex multi-hop transaction relationships and lack real-time explainable risk scoring.',
    technicalApproach:
      'Combined transaction attributes, Random Forest classification, and historical user-card-merchant relationship counts. Features FastAPI scoring endpoints (/score and /score-live) for real-time investigation prioritisation. Note: Returned score is an uncalibrated ranking score for human review, not a confirmed fraud probability.',
    stack: ['Python', 'FastAPI', 'scikit-learn', 'NumPy', 'pandas', 'joblib', 'IBM LinuxONE'],
    contribution: 'Risk scoring pipeline, Random Forest model integration & FastAPI endpoint architecture.',
    accent: '#FB923C',
    accentSoft: 'rgba(251, 146, 60, 0.15)',
    github: 'https://github.com/surajsrinivas27/SafePay-Sentinel',
    context: 'IBM Z Datathon 2026 — Team ZynFocus',
    featured: true,
  },
  {
    id: 'prep-pilot-ai',
    title: 'Prep-Pilot AI',
    category: 'AI | Interview & Exam Preparation',
    shortDescription:
      'An intelligent AI-powered preparation platform providing customized practice, feedback, and performance analytics.',
    problemSolved:
      'Job seekers and students lack personalized, real-time feedback and structured practice environments tailored to specific domains.',
    technicalApproach:
      'Engineered domain-specific AI evaluation workflows with automated response feedback, personalized question generation, and progress tracking.',
    stack: ['React', 'Python', 'FastAPI', 'OpenAI API', 'Tailwind CSS'],
    contribution: 'Full-stack development, AI evaluation pipeline & interactive UI.',
    accent: '#EA580C',
    accentSoft: 'rgba(234, 88, 12, 0.15)',
    github: 'https://github.com/surajsrinivas27/prep-ai',
    context: 'Manual Verification Required (Repository link currently returning 404)',
    featured: true,
  },
  {
    id: 'flexapi-hc',
    title: 'FlexAPI-HC',
    category: 'Backend Engineering | Healthcare',
    shortDescription:
      'An intelligent API gateway for healthcare systems that enables dynamic hospital API selection based on Quality of Service (QoS).',
    problemSolved:
      'Healthcare platforms suffer downtime and latency when hardcoded to single hospital provider APIs without QoS monitoring or failovers.',
    technicalApproach:
      'Built a QoS-ranked dynamic routing gateway with automated health checks, request-level failovers, and circuit breakers for medical APIs.',
    stack: ['Python', 'FastAPI', 'REST APIs', 'Circuit Breaker', 'QoS Engine'],
    contribution: 'Dynamic routing algorithm and circuit breaker middleware.',
    accent: '#FDBA74',
    accentSoft: 'rgba(253, 186, 116, 0.15)',
    github: 'https://github.com/surajsrinivas27',
    featured: false,
  },
  {
    id: 'shilpdwaar',
    title: 'ShilpDwaar',
    category: 'AI | Social Impact | Marketplace',
    shortDescription:
      'An AI-driven market linkage and smart cataloging platform for marginalized artisans.',
    problemSolved:
      'Traditional artisans struggle to digitize craft catalogs, translate product specs, and access fair digital marketplaces.',
    technicalApproach:
      'Utilized Gemini vision models for automatic product cataloging, multilingual description generation, and marketplace integration.',
    stack: ['React', 'Tailwind CSS', 'Vite', 'FastAPI', 'MongoDB Atlas', 'Google Gemini'],
    contribution: 'Smart cataloging pipeline & marketplace UI experience.',
    accent: '#FF8C00',
    accentSoft: 'rgba(255, 140, 0, 0.15)',
    github: 'https://github.com/surajsrinivas27',
    context: 'Smart India Hackathon 2026 (SIH26090)',
    featured: false,
  },
]
