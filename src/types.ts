export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  architectureDetails?: string[];
}

export interface Publication {
  id: string;
  title: string;
  conference: string;
  venue: string;
  year: string;
  citations: string;
  domain: string;
  description: string;
  link: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  highlights: string[];
}
