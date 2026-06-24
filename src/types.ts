export interface Project {
  id: string;
  index: string;
  title: string;
  tagline: string;
  iconName: string; // references lucide-react icon names
  tags: string[];
  specs: string[];
  features: string[];
  status: 'DEPLOYED' | 'OPERATIONAL' | 'STABLE';
  githubUrl: string;
  extraLogs: string[];
}

export interface Education {
  id: string;
  period: string;
  degree: string;
  institution: string;
  statusText?: string;
  iconName: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  color: 'green' | 'yellow';
  type: 'progress' | 'grid' | 'list';
  skills: string[] | { name: string; level: number }[];
}

export interface ConsoleMessage {
  timestamp: string;
  type: 'system' | 'action' | 'success' | 'warning' | 'error';
  text: string;
}
