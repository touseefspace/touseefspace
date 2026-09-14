import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Resolve SANITY_TOKEN and PROJECT_ID from process.env, touseefspace/.env.local, or touseefspace/.env
let token = process.env.SANITY_TOKEN
let targetProjectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
let targetDataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET

const studioEnvLocal = path.resolve(__dirname, '../.env.local')
const studioEnv = path.resolve(__dirname, '../.env')
const frontendEnvLocal = path.resolve(__dirname, '../../touseefspace/.env.local')
const frontendEnv = path.resolve(__dirname, '../../touseefspace/.env')

const envFiles = [studioEnvLocal, studioEnv, frontendEnvLocal, frontendEnv]
for (const file of envFiles) {
  if (fs.existsSync(file)) {
    const envContent = fs.readFileSync(file, 'utf8')
    if (!token) {
      const match = envContent.match(/SANITY_TOKEN=["']?([^"'\r\n]+)["']?/)
      if (match) token = match[1]
    }
    if (!targetProjectId) {
      const match = envContent.match(/(?:SANITY_STUDIO_PROJECT_ID|NEXT_PUBLIC_SANITY_PROJECT_ID)=["']?([^"'\r\n]+)["']?/)
      if (match && match[1] !== 'your_sanity_project_id') targetProjectId = match[1]
    }
    if (!targetDataset) {
      const match = envContent.match(/(?:SANITY_STUDIO_DATASET|NEXT_PUBLIC_SANITY_DATASET)=["']?([^"'\r\n]+)["']?/)
      if (match) targetDataset = match[1]
    }
  }
}

if (!token) {
  console.error('❌ Error: SANITY_TOKEN environment variable is required to run the seed script.')
  console.error('Create a token with write access at https://sanity.io/manage and run:')
  console.error('SANITY_TOKEN=your_token npm run seed')
  process.exit(1)
}

if (!targetProjectId) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is required in .env.local (or SANITY_STUDIO_PROJECT_ID) to run the seed script.')
  process.exit(1)
}

const client = createClient({
  projectId: targetProjectId,
  dataset: targetDataset || 'production',
  apiVersion: '2026-02-01',
  token,
  useCdn: false,
})

const seedAssetsDir = fs.existsSync(path.resolve(__dirname, '../seed-assets'))
  ? path.resolve(__dirname, '../seed-assets')
  : path.resolve(__dirname, '..')

const categoryIconsDir = path.resolve(seedAssetsDir, 'category_icons')
const skillIconsDir = path.resolve(seedAssetsDir, 'skill_icons')
const socialsDir = path.resolve(seedAssetsDir, 'socials')
const blogpostsDir = path.resolve(seedAssetsDir, 'blogposts')
const projectsDir = path.resolve(seedAssetsDir, 'projects')

const assetCache: Record<string, string> = {}

async function uploadAsset(filePath: string): Promise<string | null> {
  const filename = path.basename(filePath)
  if (assetCache[filename]) {
    return assetCache[filename]
  }

  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const stream = fs.createReadStream(filePath)
    const asset = await client.assets.upload('image', stream, { filename })
    assetCache[filename] = asset._id
    return asset._id
  } catch (err) {
    console.error(`❌ Failed to upload ${filename}:`, err)
    return null
  }
}

async function seed() {
  console.log('🌱 Starting Sanity seed with normalized skills & real icon assets...')

  // 1. Seed Home Page Singleton
  console.log('\n1. Seeding Home Page singleton...')
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    title: 'I turn messy workflows into simple & reliable software spaces.',
    role: 'AI Systems and Software Developer',
    description:
      'Developing custom web applications and AI systems engineered to eliminate operational clutter — giving ambitious teams the space to scale with calm, dependable reliability.',
    location: 'United Arab Emirates',
  })

  // 2. Upload Category Icons & Seed Skill Categories (from unified category_icons/ folder)
  console.log('\n2. Uploading Category Icons & Seeding Skill Categories...')
  const categoriesDef = [
    {
      _id: 'cat-web',
      _type: 'skillCategory',
      title: 'Custom Web Applications',
      description:
        'High-performance web applications, responsive interfaces, and interactive user experiences.',
      iconFile: 'code-xml.svg',
      order: 1,
    },
    {
      _id: 'cat-ai',
      _type: 'skillCategory',
      title: 'AI Systems & Automation',
      description:
        'Practical LLM integrations, document intelligence, and automated extraction pipelines.',
      iconFile: 'cpu.svg',
      order: 2,
    },
    {
      _id: 'cat-cloud',
      _type: 'skillCategory',
      title: 'Cloud, DevOps & Databases',
      description:
        'Resilient database design, containerized deployments, and serverless backends.',
      iconFile: 'database.svg',
      order: 3,
    },
  ]

  for (const cat of categoriesDef) {
    const lightAssetId = await uploadAsset(path.join(categoryIconsDir, cat.iconFile))
    const darkAssetId = await uploadAsset(
      path.join(categoryIconsDir, cat.iconFile.replace('.svg', '-dark.svg'))
    )
    const doc: any = {
      _id: cat._id,
      _type: 'skillCategory',
      title: cat.title,
      description: cat.description,
      order: cat.order,
    }
    if (lightAssetId) {
      doc.iconLight = {
        _type: 'image',
        asset: { _type: 'reference', _ref: lightAssetId },
      }
    }
    if (darkAssetId) {
      doc.iconDark = {
        _type: 'image',
        asset: { _type: 'reference', _ref: darkAssetId },
      }
    } else if (lightAssetId) {
      doc.iconDark = {
        _type: 'image',
        asset: { _type: 'reference', _ref: lightAssetId },
      }
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ Category seeded: ${cat.title}`)
  }

  // 3. Upload Skill Icons & Seed Normalized Skill Documents (Curated 13 core skills)
  console.log('\n3. Uploading Skill Icons & Seeding Normalized Skill Documents...')
  const skillsDef = [
    // Web Applications
    { id: 'skill-next-js', name: 'Next.js', cat: 'cat-web', icon: 'next-js.svg', prof: 95, order: 1 },
    { id: 'skill-react-js', name: 'React', cat: 'cat-web', icon: 'react-js.svg', prof: 94, order: 2 },
    { id: 'skill-typescript', name: 'TypeScript', cat: 'cat-web', icon: 'typescript.svg', prof: 92, order: 3 },
    { id: 'skill-tailwind-css', name: 'Tailwind CSS', cat: 'cat-web', icon: 'tailwind-css.svg', prof: 95, order: 4 },
    { id: 'skill-node-js', name: 'Node.js', cat: 'cat-web', icon: 'node-js.svg', prof: 90, order: 5 },

    // AI Systems & Automation
    { id: 'skill-python', name: 'Python', cat: 'cat-ai', icon: 'python.svg', prof: 92, order: 1 },
    { id: 'skill-fastapi', name: 'FastAPI', cat: 'cat-ai', icon: 'fastapi.svg', prof: 90, order: 2 },
    { id: 'skill-machine-learning', name: 'Machine Learning & LLMs', cat: 'cat-ai', icon: 'machine-learning.svg', prof: 88, order: 3 },
    { id: 'skill-n8n', name: 'n8n Workflow Automation', cat: 'cat-ai', icon: 'n8n.svg', prof: 88, order: 4 },

    // Cloud, DevOps & Databases
    { id: 'skill-postgresql', name: 'PostgreSQL', cat: 'cat-cloud', icon: 'postgresql-icon.svg', prof: 92, order: 1 },
    { id: 'skill-supabase', name: 'Supabase', cat: 'cat-cloud', icon: 'supabase.svg', prof: 90, order: 2 },
    { id: 'skill-docker', name: 'Docker', cat: 'cat-cloud', icon: 'docker.svg', prof: 88, order: 3 },
    { id: 'skill-git', name: 'Git', cat: 'cat-cloud', icon: 'git.svg', prof: 92, order: 4 },
  ]

  for (const s of skillsDef) {
    const iconAssetId = await uploadAsset(path.join(skillIconsDir, s.icon))
    const doc: any = {
      _id: s.id,
      _type: 'skill',
      name: s.name,
      category: {
        _type: 'reference',
        _ref: s.cat,
      },
      proficiency: s.prof,
      order: s.order,
    }
    if (iconAssetId) {
      doc.icon = {
        _type: 'image',
        asset: { _type: 'reference', _ref: iconAssetId },
      }
      doc.iconDark = {
        _type: 'image',
        asset: { _type: 'reference', _ref: iconAssetId },
      }
      doc.iconLight = {
        _type: 'image',
        asset: { _type: 'reference', _ref: iconAssetId },
      }
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ Skill seeded: ${s.name} (${s.cat})`)
  }

  // 4. Seed Projects with References to Skills (Matching the 2 seed images)
  console.log('\n4. Seeding Projects with References to Skills...')
  const projects = [
    {
      _id: 'project-heritage-law-firm',
      _type: 'project',
      title: 'Heritage Corporate Law Firm Web Presence',
      slug: { _type: 'slug', current: 'heritage-corporate-law-firm-web-presence' },
      client: 'Heritage Legal Partners',
      role: 'Lead Full Stack Architect',
      period: '2024 - 2025',
      summary:
        'A modern, high-speed corporate web presence, secure client intake portal, and editorial knowledge hub for a leading corporate law practice.',
      problem:
        'The firm relied on an outdated, unoptimized website with disconnected intake forms, resulting in delayed consultation turnaround times and poor client engagement metrics.',
      solution:
        'Engineered an editorial digital presence using Next.js 16, TypeScript, Tailwind CSS, and headless content modeling with instant contact flows.',
      outcome:
        'Increased qualified client inquiries by 64% and reduced consultation onboarding latency from 48 hours to under 2 hours.',
      metrics: [
        { _key: 'm1', label: 'Inquiries Growth', value: '+64%' },
        { _key: 'm2', label: 'Onboarding Latency', value: '<2h' },
        { _key: 'm3', label: 'Lighthouse Score', value: '99/100' },
      ],
      technologies: [
        { _key: 't1', _type: 'reference', _ref: 'skill-next-js' },
        { _key: 't2', _type: 'reference', _ref: 'skill-typescript' },
        { _key: 't3', _type: 'reference', _ref: 'skill-tailwind-css' },
        { _key: 't4', _type: 'reference', _ref: 'skill-postgresql' },
        { _key: 't5', _type: 'reference', _ref: 'skill-node-js' },
      ],
      features: [
        'High-performance editorial layout with instant sub-100ms page transitions',
        'Streamlined client intake workflow with automated email dispatch',
        'Dynamic practice area and attorney directory powered by headless CMS',
        'Strict responsive design optimized for mobile and corporate desktops',
      ],
      body: [
        {
          _key: 'b1',
          _type: 'block',
          style: 'h2',
          children: [{ _key: 'c1', _type: 'span', text: 'Strategic Web Architecture for Legal Practices' }],
        },
        {
          _key: 'b2',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'c2',
              _type: 'span',
              text: 'In high-stakes corporate law, credibility and immediate accessibility are paramount. We rebuilt Heritage Legal Partners web infrastructure from the ground up, moving away from fragmented legacy templates to an ultra-fast, accessible App Router architecture.',
            },
          ],
        },
      ],
      githubUrl: 'https://github.com/touseefspace',
      featured: true,
      order: 1,
    },
    {
      _id: 'project-client-portal-saas',
      _type: 'project',
      title: 'Real-Time Client Analytics Portal',
      slug: { _type: 'slug', current: 'client-portal-saas' },
      client: 'B2B SaaS Services',
      role: 'Full Stack Developer',
      period: '2023 - 2024',
      summary:
        'High-performance collaborative client dashboard with real-time telemetry and reporting.',
      problem:
        'Clients lacked self-service visibility into their service health and deliverable timelines, creating high support volume via email chains.',
      solution:
        'Engineered a reactive portal featuring live telemetry updates via Server-Sent Events, interactive charts, and instant exportable PDF reports.',
      outcome:
        'Reduced client status inquiry tickets by 76% and boosted client retention by 35% in the first two quarters.',
      metrics: [
        { _key: 'm1', label: 'Ticket Reduction', value: '-76%' },
        { _key: 'm2', label: 'Client Retention', value: '+35%' },
        { _key: 'm3', label: 'Telemetry Latency', value: '180ms' },
      ],
      technologies: [
        { _key: 't1', _type: 'reference', _ref: 'skill-react-js' },
        { _key: 't2', _type: 'reference', _ref: 'skill-next-js' },
        { _key: 't3', _type: 'reference', _ref: 'skill-supabase' },
        { _key: 't4', _type: 'reference', _ref: 'skill-tailwind-css' },
        { _key: 't5', _type: 'reference', _ref: 'skill-typescript' },
      ],
      features: [
        'Live telemetry feeds powered by PostgreSQL change streams',
        'Interactive analytics dashboards with client-specific views',
        'One-click automated compliance report export in PDF format',
      ],
      githubUrl: 'https://github.com/touseefspace',
      featured: true,
      order: 2,
    },
  ]

  for (const proj of projects) {
    const slug = typeof proj.slug === 'string' ? proj.slug : proj.slug.current
    const possibleFilenames = [
      `${slug}.png`,
      `${slug}.jpg`,
      `${slug}.webp`,
      `${slug}.svg`,
      `${proj._id}.png`,
      ...(slug.includes('heritage') ? ['heritage-law-firm.jpg'] : []),
      ...(slug.includes('client') || slug.includes('analytics') ? ['real-time-analytics.jpg'] : []),
    ]
    for (const fn of possibleFilenames) {
      const assetId = await uploadAsset(path.join(projectsDir, fn))
      if (assetId) {
        ; (proj as any).image = {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
          alt: proj.title,
        }
        break
      }
    }

    await client.createOrReplace(proj as any)
    console.log(`  ✓ Project seeded: ${proj.title}`)
  }

  // 5. Seed Experiences with References to Skills
  console.log('\n5. Seeding Experiences with References to Skills...')
  const experiences = [
    {
      _id: 'exp-1',
      _type: 'experience',
      category: 'work',
      company: 'Custom Web & AI Solutions',
      role: 'AI Systems and Software Developer',
      time: '2023 - Present',
      location: 'United Arab Emirates',
      description:
        'Designing, engineering, and shipping custom business web applications, ERPs, and automated AI workflows for private clients.',
      tasks: [
        {
          _key: 't1',
          task: 'Architected end-to-end web applications with Next.js, TypeScript, and relational databases for retail and logistics clients.',
        },
        {
          _key: 't2',
          task: 'Integrated LLM pipelines for automated data extraction, reducing client manual operations by 80%.',
        },
        {
          _key: 't3',
          task: 'Constructed headless CMS and API backends with robust role-based security.',
        },
      ],
      skillStack: [
        { _key: 's1', _type: 'reference', _ref: 'skill-next-js' },
        { _key: 's2', _type: 'reference', _ref: 'skill-typescript' },
        { _key: 's3', _type: 'reference', _ref: 'skill-python' },
        { _key: 's4', _type: 'reference', _ref: 'skill-fastapi' },
        { _key: 's5', _type: 'reference', _ref: 'skill-postgresql' },
        { _key: 's6', _type: 'reference', _ref: 'skill-docker' },
      ],
      order: 1,
    },
    {
      _id: 'exp-2',
      _type: 'experience',
      category: 'education',
      company: 'Computer Science Degree',
      role: 'B.S. in Computer Science',
      time: 'Foundational',
      location: 'Academic Foundation',
      description:
        'Rigorous education in software design principles, algorithms, distributed databases, and computational systems.',
      tasks: [
        {
          _key: 't1',
          task: 'Specialized in software architecture, database management systems, and system design.',
        },
        {
          _key: 't2',
          task: 'Delivered multiple full-stack capstone projects and open-source utilities.',
        },
      ],
      skillStack: [
        { _key: 's1', _type: 'reference', _ref: 'skill-python' },
        { _key: 's2', _type: 'reference', _ref: 'skill-typescript' },
        { _key: 's3', _type: 'reference', _ref: 'skill-postgresql' },
        { _key: 's4', _type: 'reference', _ref: 'skill-git' },
      ],
      order: 2,
    },
  ]

  for (const exp of experiences) {
    await client.createOrReplace(exp)
    console.log(`  ✓ Experience seeded: ${exp.company}`)
  }

  // 6. Seed Social Links
  console.log('\n6. Seeding Social Links...')
  const socials = [
    {
      _id: 'soc-1',
      _type: 'socialLink',
      name: 'GitHub',
      url: 'https://github.com/touseefspace',
      username: '@touseefspace',
      order: 1,
    },
    {
      _id: 'soc-2',
      _type: 'socialLink',
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/touseefspace',
      username: 'touseefspace',
      order: 2,
    },
    {
      _id: 'soc-3',
      _type: 'socialLink',
      name: 'X (Twitter)',
      url: 'https://x.com/touseefspace',
      username: '@touseefspace',
      order: 3,
    },
    {
      _id: 'soc-4',
      _type: 'socialLink',
      name: 'Email',
      url: 'mailto:hello@touseefspace.com',
      username: 'hello@touseefspace.com',
      order: 4,
    },
    {
      _id: 'soc-5',
      _type: 'socialLink',
      name: 'WhatsApp',
      url: 'https://wa.me/971544317175',
      username: '+971 54 431 7175',
      order: 5,
    },
  ]

  for (const s of socials) {
    const raw = s.name.toLowerCase()
    let base = raw.replace(/[^a-z0-9]/g, '')
    if (raw.includes('twitter') || raw.includes('x')) base = 'x'
    if (raw.includes('email') || raw.includes('mail')) base = 'gmail'
    if (raw.includes('github')) base = 'github'

    const darkFiles = [`${base}-dark.svg`, `${base}-dark.png`, `${base}.svg`, `${base}.png`]
    for (const fn of darkFiles) {
      const assetId = await uploadAsset(path.join(socialsDir, fn))
      if (assetId) {
        ; (s as any).iconDark = {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        }
        break
      }
    }
    const lightFiles = [`${base}-light.svg`, `${base}-light.png`, `${base}.svg`, `${base}.png`]
    for (const fn of lightFiles) {
      const assetId = await uploadAsset(path.join(socialsDir, fn))
      if (assetId) {
        ; (s as any).iconLight = {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        }
        break
      }
    }
    await client.createOrReplace(s as any)
  }
  console.log('  ✓ Social links seeded.')

  // 7. Seed Blog Posts & Upload Cover Images
  console.log('\n7. Seeding Blog Posts & Uploading Cover Images...')
  const blogPosts = [
    {
      _id: 'post-1',
      _type: 'post',
      title: 'Event-Driven ERP Systems with Next.js & PostgreSQL',
      slug: { _type: 'slug', current: 'event-driven-erp-systems-with-next-js-and-postgresql' },
      publishedAt: '2026-02-15T00:00:00.000Z',
      postType: 'technical',
      excerpt: 'How I designed sub-150ms synchronization and concurrency-safe barcode scanning for warehouse operations.',
      estimatedReadTime: '8 min read',
      featured: true,
      tags: ['Next.js', 'PostgreSQL', 'Architecture', 'Systems'],
      body: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'Modern distribution platforms require instant consistency across physically dispersed depots. Here is the operational architecture behind our wholesale synchronization engine.',
            },
          ],
        },
      ],
    },
    {
      _id: 'post-2',
      _type: 'post',
      title: 'Practical Document Extraction Pipelines with Python & Structured Outputs',
      slug: { _type: 'slug', current: 'practical-document-extraction-pipelines' },
      publishedAt: '2026-01-20T00:00:00.000Z',
      postType: 'technical',
      excerpt: 'A practical approach to extracting reliable financial data from unstructured PDFs using Python, LLMs, structured outputs, and deterministic validation.',
      estimatedReadTime: '5 min read',
      featured: false,
      tags: ['AI Workflows', 'Python', 'Automation'],
      body: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'Document intelligence is rarely about raw prompting; it is about deterministic parsing boundaries, schema validation, and fallback state machines.',
            },
          ],
        },
      ],
    },
  ]

  for (const post of blogPosts) {
    const slug = post.slug.current
    const possibleCovers = [
      `${slug}.png`,
      `${slug}.jpg`,
      `${slug}.webp`,
      `${post._id}.png`,
      ...(post._id === 'post-1' ? ['barcode.jpg'] : []),
      ...(post._id === 'post-2' ? ['pdfextraction.jpg'] : []),
    ]
    for (const fn of possibleCovers) {
      const assetId = await uploadAsset(path.join(blogpostsDir, fn))
      if (assetId) {
        ; (post as any).coverImage = {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
          alt: post.title,
        }
        break
      }
    }
    await client.createOrReplace(post as any)
    console.log(`  ✓ Blog post seeded: ${post.title}`)
  }

  // 8. Migration Verification Queries
  console.log('\n8. Running Migration Verification Checks...')
  const seededSkills = await client.fetch<any[]>(`*[_type == "skill"]{ _id, name, "categoryRef": category._ref }`)
  console.log(`  ✓ Total skill documents: ${seededSkills.length}`)

  // Check for duplicates
  const skillNames = seededSkills.map((s) => s.name.toLowerCase())
  const duplicates = skillNames.filter((name, idx) => skillNames.indexOf(name) !== idx)
  if (duplicates.length > 0) {
    console.warn(`  ⚠️ Warning: Duplicate skill names found: ${duplicates.join(', ')}`)
  } else {
    console.log('  ✓ Check passed: No duplicate skills exist.')
  }

  // Check valid category references
  const orphanSkills = seededSkills.filter((s) => !s.categoryRef)
  if (orphanSkills.length > 0) {
    console.warn(`  ⚠️ Warning: Skills without category: ${orphanSkills.map((s) => s.name).join(', ')}`)
  } else {
    console.log('  ✓ Check passed: 100% of skills have a valid category reference.')
  }

  console.log('\n✨ All content and real icon assets successfully seeded into Sanity production dataset!')
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
