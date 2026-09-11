export interface Technology {
  _key?: string;
  name: string;
  skill?: string;
  icon?: {
    asset?: {
      _id?: string;
      url?: string;
    };
    url?: string;
  };
}

export interface Metric {
  _key?: string;
  label: string;
  value: string;
}

export interface ProjectImage {
  asset?: {
    _id?: string;
    url?: string;
  };
  url?: string;
  alt?: string;
}

export interface Project {
  _id?: string;
  id: string;
  title: string;
  slug: string;
  aliases?: string[];
  client?: string;
  role?: string;
  period?: string;
  summary?: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  metrics?: Metric[];
  technologies?: Technology[];
  features?: (string | { feature?: string })[];
  body?: unknown;
  githubUrl?: string | null;
  liveUrl?: string | null;
  image?: ProjectImage | null;
  featured?: boolean;
}

export interface ExperienceSkill {
  skill?: string;
  name?: string;
  level?: string;
  icon?: {
    asset?: {
      _id?: string;
      url?: string;
    };
    url?: string;
  };
}

export interface Experience {
  _id?: string;
  id: string;
  role: string;
  title?: string;
  company: string;
  period: string;
  time?: string;
  location?: string;
  category?: "work" | "education" | string;
  description?: string;
  summary?: string;
  current?: boolean;
  tasks?: (string | { task?: string })[];
  technologies?: (string | Technology)[];
  skillStack?: ExperienceSkill[];
  attachments?: {
    label?: string;
    file?: {
      url?: string;
    };
  }[];
  logo?: {
    asset?: {
      _id?: string;
      url?: string;
    };
    url?: string;
  };
}

export interface Skill {
  _id?: string;
  name: string;
  level?: string;
  category?: string;
  proficiency?: number;
  highlight?: boolean;
  yearsOfExperience?: number;
  icon?: {
    asset?: {
      _id?: string;
      url?: string;
    };
    url?: string;
  };
  iconDark?: {
    asset?: {
      _id?: string;
      url?: string;
    };
    url?: string;
  };
  iconLight?: {
    asset?: {
      _id?: string;
      url?: string;
    };
    url?: string;
  };
  [key: string]: unknown;
}

export interface SkillCategory {
  _id?: string;
  id?: string;
  title: string;
  name?: string;
  description?: string;
  skills: Skill[];
}

export interface SocialLink {
  _id?: string;
  id?: string;
  name?: string;
  platform?: string;
  url: string;
  username?: string;
  label?: string;
  icon?: string;
  iconDark?: {
    url?: string;
    asset?: {
      url?: string;
    };
  } | string;
}

export interface PostAuthor {
  name?: string;
  image?: unknown;
}

export interface PostCategory {
  _id?: string;
  title?: string;
}

export interface Post {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  summary?: string;
  excerpt?: string;
  publishedAt?: string;
  readingTime?: number;
  estimatedReadTime?: number | string;
  featured?: boolean;
  tags?: string[];
  categories?: (string | PostCategory)[];
  author?: PostAuthor;
  coverImage?: unknown;
  body?: unknown;
}

export interface HomePageData {
  heroTagline?: string;
  heroHeadline?: string;
  heroBio?: string;
  aboutText?: string;
  servicesTitle?: string;
  servicesList?: string[];
  metrics?: Metric[];
}
