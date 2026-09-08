import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Resolve SANITY_TOKEN from process.env or touseefspace/.env
let token = process.env.SANITY_TOKEN
if (!token) {
  const envPath = path.resolve(__dirname, '../../touseefspace/.env')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    const match = envContent.match(/SANITY_TOKEN=["']?([^"'\r\n]+)["']?/)
    if (match) {
      token = match[1]
    }
  }
}

if (!token) {
  console.error('❌ Error: SANITY_TOKEN environment variable is required to run the seed script.')
  console.error('Create a token with write access at https://sanity.io/manage and run:')
  console.error('SANITY_TOKEN=your_token npx tsx scripts/seed-sanity.ts')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '52hp81x4',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2026-02-01',
  token,
  useCdn: false,
})

const categoryIconsDir = path.resolve(__dirname, '../category_icons')
const skillIconsDir = path.resolve(__dirname, '../skill_icons')

const assetCache: Record<string, string> = {}

async function uploadIcon(filePath: string): Promise<string | null> {
  const filename = path.basename(filePath)
  if (assetCache[filename]) {
    return assetCache[filename]
  }

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Warning: Icon file not found: ${filePath}`)
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

  // 2. Upload Category Icons & Seed Skill Categories
  console.log('\n2. Uploading Category Icons & Seeding Skill Categories...')
  const categoriesDef = [
    {
      _id: 'cat-web',
      _type: 'skillCategory',
      title: 'Custom Web Applications',
      description:
        'High-performance web applications, modern interfaces, and internal operational tools.',
      iconFile: 'code-xml.svg',
      order: 1,
    },
    {
      _id: 'cat-ai',
      _type: 'skillCategory',
      title: 'AI Workflows & Automation',
      description:
        'Practical LLM integrations, document intelligence, and automated extraction pipelines.',
      iconFile: 'cpu.svg',
      order: 2,
    },
    {
      _id: 'cat-cloud',
      _type: 'skillCategory',
      title: 'Cloud Systems & Databases',
      description:
        'Resilient database design, headless CMS architecture, and serverless backends.',
      iconFile: 'database.svg',
      order: 3,
    },
    {
      _id: 'cat-devops',
      _type: 'skillCategory',
      title: 'DevOps & Cloud Infrastructure',
      description:
        'Containerized deployments, cloud services, automated CI/CD, and deployment infrastructure.',
      iconFile: 'cloud.svg',
      order: 4,
    },
    {
      _id: 'cat-tools',
      _type: 'skillCategory',
      title: 'Developer Tooling & Collaboration',
      description:
        'IDEs, version control workflows, automated testing, and developer collaboration.',
      iconFile: 'paintbrush.svg',
      order: 5,
    },
    {
      _id: 'cat-mobile',
      _type: 'skillCategory',
      title: 'Mobile & Platform Engineering',
      description:
        'Cross-platform mobile applications, responsive viewports, and native developer SDKs.',
      iconFile: 'smartphone.svg',
      order: 6,
    },
  ]

  for (const cat of categoriesDef) {
    const iconAssetId = await uploadIcon(path.join(categoryIconsDir, cat.iconFile))
    const doc: any = {
      _id: cat._id,
      _type: 'skillCategory',
      title: cat.title,
      description: cat.description,
      order: cat.order,
    }
    if (iconAssetId) {
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
    console.log(`  ✓ Category seeded: ${cat.title}`)
  }

  // 3. Upload Skill Icons & Seed Normalized Skill Documents
  console.log('\n3. Uploading Skill Icons & Seeding Normalized Skill Documents...')
  const skillsDef = [
    // Web Applications
    { id: 'skill-next-js', name: 'Next.js', cat: 'cat-web', icon: 'next-js.svg', prof: 95, order: 1 },
    { id: 'skill-react-js', name: 'React', cat: 'cat-web', icon: 'react-js.svg', prof: 94, order: 2 },
    { id: 'skill-typescript', name: 'TypeScript', cat: 'cat-web', icon: 'typescript.svg', prof: 92, order: 3 },
    { id: 'skill-javascript', name: 'JavaScript', cat: 'cat-web', icon: 'javascript.svg', prof: 95, order: 4 },
    { id: 'skill-tailwind-css', name: 'Tailwind CSS', cat: 'cat-web', icon: 'tailwind-css.svg', prof: 95, order: 5 },
    { id: 'skill-html5', name: 'HTML5 & CSS3', cat: 'cat-web', icon: 'html5.svg', prof: 95, order: 6 },
    { id: 'skill-node-js', name: 'Node.js', cat: 'cat-web', icon: 'node-js.svg', prof: 90, order: 7 },
    { id: 'skill-bootstrap', name: 'Bootstrap', cat: 'cat-web', icon: 'bootstrap.svg', prof: 88, order: 8 },

    // AI Workflows & Automation
    { id: 'skill-python', name: 'Python', cat: 'cat-ai', icon: 'python.svg', prof: 92, order: 1 },
    { id: 'skill-fastapi', name: 'FastAPI', cat: 'cat-ai', icon: 'fastapi.svg', prof: 90, order: 2 },
    { id: 'skill-machine-learning', name: 'Machine Learning & LLMs', cat: 'cat-ai', icon: 'machine-learning.svg', prof: 88, order: 3 },
    { id: 'skill-n8n', name: 'n8n Workflow Automation', cat: 'cat-ai', icon: 'n8n.png', prof: 90, order: 4 },
    { id: 'skill-jupyter', name: 'Jupyter Notebooks', cat: 'cat-ai', icon: 'jupyter.svg', prof: 85, order: 5 },
    { id: 'skill-anaconda', name: 'Anaconda', cat: 'cat-ai', icon: 'anaconda.svg', prof: 82, order: 6 },

    // Cloud Systems & Databases
    { id: 'skill-postgresql', name: 'PostgreSQL', cat: 'cat-cloud', icon: 'postgresql-icon.svg', prof: 92, order: 1 },
    { id: 'skill-supabase', name: 'Supabase', cat: 'cat-cloud', icon: 'supabase.svg', prof: 90, order: 2 },
    { id: 'skill-mongodb', name: 'MongoDB', cat: 'cat-cloud', icon: 'mongodb.svg', prof: 85, order: 3 },
    { id: 'skill-redis', name: 'Redis', cat: 'cat-cloud', icon: 'redis.svg', prof: 84, order: 4 },
    { id: 'skill-dynamodb', name: 'Amazon DynamoDB', cat: 'cat-cloud', icon: 'dynamodb.svg', prof: 82, order: 5 },
    { id: 'skill-firebase', name: 'Firebase', cat: 'cat-cloud', icon: 'firebase.svg', prof: 85, order: 6 },
    { id: 'skill-django', name: 'Django', cat: 'cat-cloud', icon: 'django.png', prof: 84, order: 7 },

    // DevOps & Infrastructure
    { id: 'skill-docker', name: 'Docker', cat: 'cat-devops', icon: 'docker.svg', prof: 88, order: 1 },
    { id: 'skill-aws', name: 'Amazon Web Services (AWS)', cat: 'cat-devops', icon: 'aws.svg', prof: 85, order: 2 },
    { id: 'skill-google-cloud', name: 'Google Cloud Platform', cat: 'cat-devops', icon: 'google-cloud.svg', prof: 82, order: 3 },
    { id: 'skill-git', name: 'Git', cat: 'cat-devops', icon: 'git.svg', prof: 92, order: 4 },
    { id: 'skill-github', name: 'GitHub', cat: 'cat-devops', icon: 'github.svg', prof: 92, order: 5 },

    // Developer Tooling & Collaboration
    { id: 'skill-vs-code', name: 'Visual Studio Code', cat: 'cat-tools', icon: 'vs-code.svg', prof: 95, order: 1 },
    { id: 'skill-jetbrains', name: 'JetBrains IDEs', cat: 'cat-tools', icon: 'jetbrains.svg', prof: 90, order: 2 },
    { id: 'skill-stack-overflow', name: 'Developer Problem Solving', cat: 'cat-tools', icon: 'stack-overflow.svg', prof: 92, order: 3 },

    // Mobile & Platform
    { id: 'skill-android-studio', name: 'Android Studio', cat: 'cat-mobile', icon: 'android-studio.svg', prof: 82, order: 1 },
  ]

  for (const s of skillsDef) {
    const iconAssetId = await uploadIcon(path.join(skillIconsDir, s.icon))
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

  // 4. Seed Projects with References to Skills (and strict URL behavior)
  console.log('\n4. Seeding Projects with References to Skills...')
  const projects = [
    {
      _id: 'project-aunvu-erp',
      _type: 'project',
      title: 'Aunvu / MISBAH ERP Platform',
      slug: { _type: 'slug', current: 'aunvu-erp' },
      client: 'Regional Wholesale Distribution',
      role: 'Lead Full Stack Architect',
      period: '2024 - 2025',
      summary:
        'A multi-branch inventory, sales reconciliation, and automated operational reporting system.',
      problem:
        'Branch managers tracked regional stock across 12 warehouses using disconnected spreadsheets, causing 2-day inventory sync delays and recurring inventory discrepancies.',
      solution:
        'Architected a real-time event-driven ERP with a central PostgreSQL ledger, barcode scanning workflows, and granular role-based permissions.',
      outcome:
        'Cut inventory reconciliation time by 80% and eliminated unaccounted stock discrepancies across all 12 regional warehouses.',
      metrics: [
        { _key: 'm1', label: 'Audit Time Cut', value: '80%' },
        { _key: 'm2', label: 'Branches Unified', value: '12' },
        { _key: 'm3', label: 'Sync Latency', value: '<150ms' },
      ],
      technologies: [
        { _key: 't1', _type: 'reference', _ref: 'skill-next-js' },
        { _key: 't2', _type: 'reference', _ref: 'skill-typescript' },
        { _key: 't3', _type: 'reference', _ref: 'skill-postgresql' },
        { _key: 't4', _type: 'reference', _ref: 'skill-tailwind-css' },
        { _key: 't5', _type: 'reference', _ref: 'skill-node-js' },
      ],
      features: [
        'Real-time event-driven stock ledger with immutable audit trail',
        'Sub-150ms multi-branch reconciliation over Server-Sent Events',
        'Optimistic UI barcode scanning for high-volume order dispatch',
        'Role-based multi-tenant access control with granular permissions',
      ],
      body: [
        {
          _key: 'b1',
          _type: 'block',
          style: 'h2',
          children: [{ _key: 'c1', _type: 'span', text: 'The Context & Operational Bottleneck' }],
        },
        {
          _key: 'b2',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'c2',
              _type: 'span',
              text: 'Before Aunvu ERP, the client operated 12 physical branches across regional hubs. Each location maintained local Excel spreadsheets to track outgoing orders, incoming shipments, and customer credit lines. Weekly reconciliations required days of manual phone calls and manual entries, routinely uncovering phantom inventory that caused missed orders.',
            },
          ],
        },
        {
          _key: 'b3',
          _type: 'callout',
          type: 'warning',
          title: 'Core Business Impact',
          content:
            'Manual reconciliation was costing over 40 hours of branch management time every week and resulted in a 4.2% discrepancy rate during quarter-end stocktakes.',
        },
        {
          _key: 'b4',
          _type: 'block',
          style: 'h2',
          children: [{ _key: 'c3', _type: 'span', text: 'Key Architectural Decisions' }],
        },
        {
          _key: 'b5',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'c4',
              _type: 'span',
              text: 'To ensure 100% data integrity under patchy warehouse Wi-Fi, we built an immutable transaction ledger using PostgreSQL with row-level security. Stock balances are computed derivations rather than mutable counters, eliminating concurrent write conflicts.',
            },
          ],
        },
      ],
      // No liveUrl: internal private enterprise tool!
      githubUrl: 'https://github.com/touseefspace',
      featured: true,
      order: 1,
    },
    {
      _id: 'project-ai-workflow-engine',
      _type: 'project',
      title: 'AI Document & Workflow Engine',
      slug: { _type: 'slug', current: 'ai-workflow-engine' },
      client: 'Logistics & Compliance Client',
      role: 'AI & Full Stack Engineer',
      period: '2024',
      summary:
        'Intelligent document parsing, tax validation, and automated accounting workflow dispatch.',
      problem:
        'The operations team spent over 15 hours every week manually transcribing and reconciling complex multi-page invoices from international suppliers.',
      solution:
        'Built an automated OCR and LLM pipeline that extracts structured line-item data, validates taxes against regional standards, and syncs directly into the ledger.',
      outcome:
        'Eliminated manual transcription errors with a 99.2% extraction accuracy rate, saving the business 15+ operational hours every week.',
      metrics: [
        { _key: 'm1', label: 'Hours Saved Weekly', value: '15h+' },
        { _key: 'm2', label: 'Extraction Accuracy', value: '99.2%' },
        { _key: 'm3', label: 'Turnaround Time', value: '<10s' },
      ],
      technologies: [
        { _key: 't1', _type: 'reference', _ref: 'skill-python' },
        { _key: 't2', _type: 'reference', _ref: 'skill-fastapi' },
        { _key: 't3', _type: 'reference', _ref: 'skill-docker' },
        { _key: 't4', _type: 'reference', _ref: 'skill-next-js' },
        { _key: 't5', _type: 'reference', _ref: 'skill-machine-learning' },
      ],
      features: [
        'Automated multi-page PDF document parsing and OCR normalization',
        'Schema-constrained JSON extraction using function calling models',
        'Automated tax and regional VAT validation against national standards',
        'Human-in-the-loop review queue for low-confidence edge cases',
      ],
      body: [
        {
          _key: 'b1',
          _type: 'block',
          style: 'h2',
          children: [{ _key: 'c1', _type: 'span', text: 'Operational Challenge' }],
        },
        {
          _key: 'b2',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'c2',
              _type: 'span',
              text: 'Invoices arrived in varying formats, languages, and currency conventions from over 80 global freight suppliers. Transcribing each invoice into the internal accounting system was error-prone and created supplier payment bottlenecks.',
            },
          ],
        },
      ],
      githubUrl: 'https://github.com/touseefspace',
      featured: true,
      order: 2,
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
      order: 3,
    },
  ]

  for (const proj of projects) {
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
        { _key: 's2', _type: 'reference', _ref: 'skill-javascript' },
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
    await client.createOrReplace(s)
  }
  console.log('  ✓ Social links seeded.')

  // 7. Migration Verification Queries
  console.log('\n7. Running Migration Verification Checks...')
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
