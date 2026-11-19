import type { Skill, TechCategory } from './types'

export const SKILL_CATEGORIES: TechCategory[] = [
  'Programming',
  'AI / ML',
  'Frontend',
  'Backend',
  'Database',
  'Tools',
]

export const SKILLS: Skill[] = [
  // Programming
  { name: 'Python', category: 'Programming', proficiency: 'Advanced' },
  { name: 'Java', category: 'Programming', proficiency: 'Proficient' },
  { name: 'JavaScript', category: 'Programming', proficiency: 'Advanced' },
  { name: 'TypeScript', category: 'Programming', proficiency: 'Proficient' },
  { name: 'C', category: 'Programming', proficiency: 'Foundational' },
  { name: 'C++', category: 'Programming', proficiency: 'Intermediate' },

  // AI / ML
  { name: 'Machine Learning', category: 'AI / ML', proficiency: 'Advanced' },
  { name: 'NLP', category: 'AI / ML', proficiency: 'Intermediate' },
  { name: 'Generative AI', category: 'AI / ML', proficiency: 'Proficient' },
  { name: 'RAG Architecture', category: 'AI / ML', proficiency: 'Proficient' },
  { name: 'LangChain', category: 'AI / ML', proficiency: 'Intermediate' },
  { name: 'Hugging Face', category: 'AI / ML', proficiency: 'Intermediate' },
  { name: 'Model Integration', category: 'AI / ML', proficiency: 'Advanced' },

  // Frontend
  { name: 'React', category: 'Frontend', proficiency: 'Advanced' },
  { name: 'Vite', category: 'Frontend', proficiency: 'Proficient' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Advanced' },
  { name: 'HTML5 / CSS3', category: 'Frontend', proficiency: 'Advanced' },

  // Backend
  { name: 'FastAPI', category: 'Backend', proficiency: 'Advanced' },
  { name: 'Node.js', category: 'Backend', proficiency: 'Intermediate' },
  { name: 'Express.js', category: 'Backend', proficiency: 'Intermediate' },
  { name: 'REST APIs', category: 'Backend', proficiency: 'Advanced' },

  // Database
  { name: 'MongoDB', category: 'Database', proficiency: 'Proficient' },
  { name: 'SQLite', category: 'Database', proficiency: 'Proficient' },
  { name: 'FAISS', category: 'Database', proficiency: 'Intermediate' },

  // Tools
  { name: 'Git', category: 'Tools', proficiency: 'Advanced' },
  { name: 'GitHub', category: 'Tools', proficiency: 'Advanced' },
  { name: 'Jupyter Notebook', category: 'Tools', proficiency: 'Advanced' },
  { name: 'VS Code', category: 'Tools', proficiency: 'Advanced' },
  { name: 'Google Antigravity', category: 'Tools', proficiency: 'Exploratory' },
]