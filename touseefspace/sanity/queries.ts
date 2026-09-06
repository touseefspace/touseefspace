/**
 * GROQ Queries for Sanity CMS integration.
 */

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  role,
  period,
  summary,
  problem,
  solution,
  outcome,
  metrics[] {
    _key,
    value,
    label
  },
  image {
    asset-> {
      _id,
      url
    },
    alt
  },
  technologies[] {
    _key,
    name,
    icon {
      asset-> {
        _id,
        url
      }
    }
  },
  features,
  body,
  githubUrl,
  liveUrl,
  featured
}`;

export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(order asc, _createdAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  client,
  role,
  period,
  summary,
  problem,
  solution,
  outcome,
  metrics[] {
    _key,
    value,
    label
  },
  image {
    asset-> {
      _id,
      url
    },
    alt
  },
  technologies[] {
    _key,
    name,
    icon {
      asset-> {
        _id,
        url
      }
    }
  },
  features,
  githubUrl,
  liveUrl,
  featured
}`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  client,
  role,
  period,
  summary,
  problem,
  solution,
  outcome,
  metrics[] {
    _key,
    value,
    label
  },
  image {
    asset-> {
      _id,
      url
    },
    alt
  },
  technologies[] {
    _key,
    name,
    icon {
      asset-> {
        _id,
        url
      }
    }
  },
  features,
  body,
  githubUrl,
  liveUrl,
  featured
}`;

export const ALL_PROJECT_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)][].slug.current`;

export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  estimatedReadTime,
  featured,
  tags,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  }
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  estimatedReadTime,
  featured,
  tags,
  coverImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  body
}`;

export const ALL_POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)][].slug.current`;

export const EXPERIENCES_QUERY = `*[_type == "experience"] | order(order asc, _createdAt desc) {
  _id,
  category,
  company,
  role,
  time,
  location,
  description,
  logo {
    asset-> {
      _id,
      url
    }
  },
  tasks[] {
    _key,
    task
  },
  skillStack[] {
    _key,
    skill,
    icon {
      asset-> {
        _id,
        url
      }
    }
  }
}`;

export const SKILL_CATEGORIES_QUERY = `*[_type == "skillCategory"] | order(order asc, _createdAt asc) {
  _id,
  title,
  description,
  iconDark {
    asset-> {
      _id,
      url
    }
  },
  iconLight {
    asset-> {
      _id,
      url
    }
  },
  skills[] {
    _key,
    name,
    proficiency,
    iconDark {
      asset-> {
        _id,
        url
      }
    },
    iconLight {
      asset-> {
        _id,
        url
      }
    }
  }
}`;

export const SOCIAL_LINKS_QUERY = `*[_type == "socialLink"] | order(order asc, name asc) {
  _id,
  name,
  username,
  url,
  iconDark {
    asset-> {
      _id,
      url
    }
  },
  iconLight {
    asset-> {
      _id,
      url
    }
  }
}`;

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0] {
  _id,
  title,
  role,
  description,
  location,
  portrait {
    asset-> {
      _id,
      url
    },
    alt
  }
}`;
