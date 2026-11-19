import type { Experience, Certification } from './types'

export const EXPERIENCES: Experience[] = [
  {
    year: '2026',
    title: 'IBM Z Datathon Participant',
    org: 'IBM Z / LinuxONE Community Cloud',
    description:
      'Engineered SafePay Sentinel — a real-time graph intelligence system for financial fraud detection deployed on IBM LinuxONE Community Cloud.',
    tags: ['Graph ML', 'IBM LinuxONE', 'Fraud Detection', 'Python'],
  },
  {
    year: '2026',
    title: 'Sarvam AI Hackathon Participant',
    org: 'Sarvam AI',
    description:
      'Developed AgentShield — an authorization and security gateway enforcing RBAC/ABAC guardrails on autonomous AI actions using Pydantic and FastAPI.',
    tags: ['AI Security', 'Agent Authorization', 'FastAPI', 'Pydantic'],
  },
  {
    year: '2026',
    title: 'Smart India Hackathon Participant',
    org: 'Smart India Hackathon (SIH26090)',
    description:
      'Designed ShilpDwaar — an AI market linkage and automated cataloging platform using Gemini vision models to empower marginalized artisans.',
    tags: ['GenAI', 'Gemini Vision', 'React', 'MongoDB Atlas'],
  },
  {
    year: '2023 - Present',
    title: 'B.E. Artificial Intelligence & Machine Learning',
    org: 'Global Academy of Technology, Bengaluru',
    description:
      'Third-year undergraduate student specializing in core AI/ML algorithms, data structures, backend system engineering, and intelligent automation.',
    tags: ['Machine Learning', 'Data Structures', 'System Engineering'],
  },
]

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Cyber Security',
    issuer: 'NPTEL',
    year: '2024',
  },
  {
    name: 'Ethical Hacking',
    issuer: 'NPTEL',
    year: '2024',
  },
  {
    name: 'Java Programming Workshop',
    issuer: 'Mevi Technologies',
    year: '2023',
  },
]