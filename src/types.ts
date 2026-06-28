export interface GitHubProfile {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  topics?: string[];
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: number; // 0 to 100
  iconName: string;
}

export interface CustomProject {
  id: string;
  name: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  stars: number;
  forks: number;
}
