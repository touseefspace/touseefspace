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
  technologies[@->name != null || name != null] {
    _key,
    _type,
    _type == "reference" => {
      "name": @->name,
      "icon": {
        "asset": {
          "_id": coalesce(@->icon.asset->_id, @->iconDark.asset->_id),
          "url": coalesce(@->icon.asset->url, @->iconDark.asset->url)
        }
      }
    },
    _type != "reference" => {
      name,
      icon {
        asset-> {
          _id,
          url
        }
      }
    }
  },
  features,
  body,
  githubUrl,
  liveUrl,
  featured
}`;

export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(order asc, _createdAt desc)[0...8] {
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
  technologies[@->name != null || name != null] {
    _key,
    _type,
    _type == "reference" => {
      "name": @->name,
      "icon": {
        "asset": {
          "_id": coalesce(@->icon.asset->_id, @->iconDark.asset->_id),
          "url": coalesce(@->icon.asset->url, @->iconDark.asset->url)
        }
      }
    },
    _type != "reference" => {
      name,
      icon {
        asset-> {
          _id,
          url
        }
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
  technologies[@->name != null || name != null] {
    _key,
    _type,
    _type == "reference" => {
      "name": @->name,
      "icon": {
        "asset": {
          "_id": coalesce(@->icon.asset->_id, @->iconDark.asset->_id),
          "url": coalesce(@->icon.asset->url, @->iconDark.asset->url)
        }
      }
    },
    _type != "reference" => {
      name,
      icon {
        asset-> {
          _id,
          url
        }
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
    "url": asset->url,
    asset-> {
      _id,
      url
    }
  },
  tasks[] {
    _key,
    task
  },
  skillStack[@->name != null || skill != null || name != null] {
    _key,
    _type,
    _type == "reference" => {
      "skill": @->name,
      "name": @->name,
      "icon": {
        "url": coalesce(@->icon.asset->url, @->iconDark.asset->url),
        "asset": {
          "_id": coalesce(@->icon.asset->_id, @->iconDark.asset->_id),
          "url": coalesce(@->icon.asset->url, @->iconDark.asset->url)
        }
      }
    },
    _type != "reference" => {
      skill,
      "name": skill,
      icon {
        "url": asset->url,
        asset-> {
          _id,
          url
        }
      }
    }
  }
}`;

export const SKILL_CATEGORIES_QUERY = `*[_type == "skillCategory"] | order(order asc, _createdAt asc) {
  _id,
  title,
  description,
  "iconDark": {
    "url": iconDark.asset->url,
    "asset": {
      "_id": iconDark.asset->_id,
      "url": iconDark.asset->url
    }
  },
  "iconLight": {
    "url": iconLight.asset->url,
    "asset": {
      "_id": iconLight.asset->_id,
      "url": iconLight.asset->url
    }
  },
  "skills": select(
    count(*[_type == "skill" && category._ref == ^._id]) > 0 =>
      *[_type == "skill" && category._ref == ^._id] | order(order asc, proficiency desc, name asc) {
        _id,
        name,
        proficiency,
        "iconDark": {
          "url": coalesce(iconDark.asset->url, icon.asset->url),
          "asset": {
            "_id": coalesce(iconDark.asset->_id, icon.asset->_id),
            "url": coalesce(iconDark.asset->url, icon.asset->url)
          }
        },
        "iconLight": {
          "url": coalesce(iconLight.asset->url, icon.asset->url),
          "asset": {
            "_id": coalesce(iconLight.asset->_id, icon.asset->_id),
            "url": coalesce(iconLight.asset->url, icon.asset->url)
          }
        }
      },
    skills[@->name != null || name != null] {
      _key,
      _type,
      _type == "reference" => {
        "name": @->name,
        "proficiency": coalesce(@->proficiency, 0),
        "iconDark": {
          "url": coalesce(@->iconDark.asset->url, @->icon.asset->url),
          "asset": {
            "_id": coalesce(@->iconDark.asset->_id, @->icon.asset->_id),
            "url": coalesce(@->iconDark.asset->url, @->icon.asset->url)
          }
        },
        "iconLight": {
          "url": coalesce(@->iconLight.asset->url, @->icon.asset->url),
          "asset": {
            "_id": coalesce(@->iconLight.asset->_id, @->icon.asset->_id),
            "url": coalesce(@->iconLight.asset->url, @->icon.asset->url)
          }
        }
      },
      _type != "reference" => {
        name,
        proficiency,
        "iconDark": {
          "url": iconDark.asset->url,
          "asset": {
            "_id": iconDark.asset->_id,
            "url": iconDark.asset->url
          }
        },
        "iconLight": {
          "url": iconLight.asset->url,
          "asset": {
            "_id": iconLight.asset->_id,
            "url": iconLight.asset->url
          }
        }
      }
    }
  )
}`;

export const SOCIAL_LINKS_QUERY = `*[_type == "socialLink"] | order(order asc, name asc) {
  _id,
  name,
  username,
  url,
  "iconDark": {
    "url": iconDark.asset->url,
    "asset": {
      "_id": iconDark.asset->_id,
      "url": iconDark.asset->url
    }
  },
  "iconLight": {
    "url": iconLight.asset->url,
    "asset": {
      "_id": iconLight.asset->_id,
      "url": iconLight.asset->url
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
