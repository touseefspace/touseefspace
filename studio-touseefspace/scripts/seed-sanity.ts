import { createClient } from '@sanity/client'

const token = process.env.SANITY_TOKEN

if (!token) {
  console.error('❌ Error: SANITY_TOKEN environment variable is required to run the seed script.')
  console.error('Create a token with write access at https://sanity.io/manage and run:')
  console.error('SANITY_TOKEN=your_token npm run seed')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '52hp81x4',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2026-02-01',
  token,
  useCdn: false,
})

async function seed() {
  console.log('🌱 Starting Sanity seed...')

  // 1. Seed Home Page Singleton
  console.log('Seeding Home Page singleton...')
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    title: 'I turn messy workflows into simple & reliable software spaces.',
    role: 'AI Systems and Software Developer',
    description:
      'Developing custom web applications and AI systems engineered to eliminate operational clutter — giving ambitious teams the space to scale with calm, dependable reliability.',
    location: 'United Arab Emirates',
  })

  // 2. Seed Projects with Phase 5 Case Study Fields
  console.log('Seeding Projects & Case Studies...')
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
        { _key: 't1', name: 'Next.js' },
        { _key: 't2', name: 'TypeScript' },
        { _key: 't3', name: 'PostgreSQL' },
        { _key: 't4', name: 'Sanity CMS' },
        { _key: 't5', name: 'Tailwind CSS' },
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
        {
          _key: 'b6',
          _type: 'codeBlock',
          language: 'sql',
          filename: 'ledger_transaction.sql',
          code: `-- Atomic ledger append with branch verification\nINSERT INTO stock_ledger (branch_id, item_id, delta_quantity, reason, initiated_by)\nVALUES ($1, $2, $3, 'DISPATCH_CONFIRMED', $4)\nRETURNING transaction_id, current_stock;`,
        },
        {
          _key: 'b7',
          _type: 'block',
          style: 'h2',
          children: [{ _key: 'c5', _type: 'span', text: 'Measurable Outcomes & Scaling' }],
        },
        {
          _key: 'b8',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'c6',
              _type: 'span',
              text: 'Within 6 weeks of rollout across all 12 facilities, stock discrepancy dropped to zero. End-of-month financial audit time dropped from 3 days to under 4 hours.',
            },
          ],
        },
      ],
      liveUrl: 'https://touseefspace.vercel.app',
      githubUrl: 'https://github.com/touseefspace',
      featured: true,
      order: 1,
    },
    {
      _id: 'project-ai-workflow-suite',
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
        { _key: 't1', name: 'Python' },
        { _key: 't2', name: 'OpenAI API' },
        { _key: 't3', name: 'Next.js' },
        { _key: 't4', name: 'FastAPI' },
        { _key: 't5', name: 'Docker' },
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
        {
          _key: 'b3',
          _type: 'codeBlock',
          language: 'python',
          filename: 'extractor_pipeline.py',
          code: `@app.post("/extract-invoice")\nasync def extract_invoice(file: UploadFile):\n    ocr_text = await run_ocr_pipeline(file)\n    structured_data = await extract_schema_with_llm(\n        text=ocr_text,\n        target_schema=InvoiceSchema\n    )\n    return validate_tax_rules(structured_data)`,
        },
      ],
      liveUrl: 'https://touseefspace.vercel.app',
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
        { _key: 't1', name: 'React' },
        { _key: 't2', name: 'Next.js' },
        { _key: 't3', name: 'Supabase' },
        { _key: 't4', name: 'Tailwind CSS' },
        { _key: 't5', name: 'TypeScript' },
      ],
      features: [
        'Live telemetry feeds powered by PostgreSQL change streams',
        'Interactive analytics dashboards with client-specific views',
        'One-click automated compliance report export in PDF format',
      ],
      liveUrl: 'https://touseefspace.vercel.app',
      githubUrl: 'https://github.com/touseefspace',
      featured: true,
      order: 3,
    },
  ]

  for (const p of projects) {
    await client.createOrReplace(p as any)
  }

  // 3. Seed Technical Blog Posts
  console.log('Seeding Blog Posts...')
  const posts = [
    {
      _id: 'post-event-driven-erp',
      _type: 'post',
      title: 'Engineering Event-Driven ERP Systems with Next.js & PostgreSQL',
      slug: { _type: 'slug', current: 'engineering-event-driven-erp-systems' },
      publishedAt: '2026-02-15T09:00:00.000Z',
      excerpt:
        'How we replaced error-prone spreadsheet synchronization with an immutable transaction ledger, sub-150ms real-time sync, and optimistic barcode scanning in warehouse environments.',
      estimatedReadTime: '6 min read',
      tags: ['Next.js', 'PostgreSQL', 'Architecture', 'Systems'],
      featured: true,
      body: [
        {
          _key: 'p1',
          _type: 'block',
          style: 'h2',
          children: [{ _key: 't1', _type: 'span', text: 'Why Traditional CRUD Fails in Inventory' }],
        },
        {
          _key: 'p2',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 't2',
              _type: 'span',
              text: 'In standard web applications, updating a product inventory level is often modeled as `UPDATE products SET stock = stock - 1 WHERE id = 123`. In a retail distribution business with 12 simultaneous regional warehouses and barcode scanners operating at rapid velocity, concurrent database updates will inevitably result in phantom inventory, race conditions, and locked tables.',
            },
          ],
        },
        {
          _key: 'p3',
          _type: 'callout',
          type: 'tip',
          title: 'The Ledger Principle',
          content:
            'Never mutate current stock numbers directly. Treat stock as a ledger: every scan is an immutable transaction record, and current stock is a derived projection.',
        },
        {
          _key: 'p4',
          _type: 'block',
          style: 'h2',
          children: [{ _key: 't3', _type: 'span', text: 'Optimistic UI for Barcode Readers' }],
        },
        {
          _key: 'p5',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 't4',
              _type: 'span',
              text: 'Warehouse operators scan boxes at an average rate of one item every 1.5 seconds. Waiting for server roundtrips kills throughput. By implementing optimistic mutations in React with rollback reconciliation queues, scanning remains butter-smooth even on 2.4GHz warehouse Wi-Fi.',
            },
          ],
        },
        {
          _key: 'p6',
          _type: 'codeBlock',
          language: 'typescript',
          filename: 'useOptimisticScan.ts',
          code: `export function useOptimisticScan() {\n  const [queue, setQueue] = useState<ScanItem[]>([]);\n\n  const handleScan = async (barcode: string) => {\n    const tempId = crypto.randomUUID();\n    // 1. Immediately acknowledge in UI\n    setQueue(prev => [...prev, { tempId, barcode, status: 'pending' }]);\n    \n    // 2. Dispatch in background\n    try {\n      await dispatchLedgerScan(barcode);\n      setQueue(prev => prev.filter(item => item.tempId !== tempId));\n    } catch (err) {\n      markAsFailed(tempId);\n    }\n  };\n  return { queue, handleScan };\n}`,
        },
      ],
    },
    {
      _id: 'post-practical-llm-document-extraction',
      _type: 'post',
      title: 'Practical Document Extraction Pipelines with Python & Structured Outputs',
      slug: { _type: 'slug', current: 'practical-document-extraction-pipelines' },
      publishedAt: '2026-01-20T11:30:00.000Z',
      excerpt:
        'Designing zero-hallucination structured invoice parsing pipelines with 99.2% accuracy and sub-10 second turnaround times.',
      estimatedReadTime: '5 min read',
      tags: ['AI Workflows', 'Python', 'Automation', 'LLMs'],
      featured: false,
      body: [
        {
          _key: 'p1',
          _type: 'block',
          style: 'h2',
          children: [{ _key: 't1', _type: 'span', text: 'Taming Unstructured PDFs' }],
        },
        {
          _key: 'p2',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 't2',
              _type: 'span',
              text: 'Extracting data from multi-page PDFs using naive text prompts frequently causes hallucinated line items or formatted dollar amounts that fail downstream financial validation. The key to 99.2% accuracy is schema-constrained structured outputs combined with deterministic tax rule verification.',
            },
          ],
        },
        {
          _key: 'p3',
          _type: 'callout',
          type: 'info',
          title: 'Two-Stage Verification',
          content:
            'Stage 1 uses an LLM to extract JSON matching strict Pydantic schemas. Stage 2 executes deterministic math (unit price * qty == line total) and rejects mathematical inconsistencies back to human review.',
        },
      ],
    },
    {
      _id: 'post-nextjs-16-caching',
      _type: 'post',
      title: 'Next.js 16 Caching in Production: cacheLife, cacheTag, and Edge Freshness',
      slug: { _type: 'slug', current: 'nextjs-16-caching-in-production' },
      publishedAt: '2025-12-10T14:15:00.000Z',
      excerpt:
        'A deep dive into Next.js 16 cache directives, avoiding cache invalidation cascades, and pairing headless CMS with edge revalidation.',
      estimatedReadTime: '7 min read',
      tags: ['Next.js', 'Performance', 'Web Development'],
      featured: false,
      body: [
        {
          _key: 'p1',
          _type: 'block',
          style: 'h2',
          children: [{ _key: 't1', _type: 'span', text: 'The Evolution of App Router Caching' }],
        },
        {
          _key: 'p2',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 't2',
              _type: 'span',
              text: "Next.js 16 introduced clean primitives like `'use cache'`, `cacheTag`, and `cacheLife`. By structuring your CMS queries with semantic tags (such as `projects`, `posts`, `social-links`), edge caches remain instant for visitors while instant on-demand revalidation triggers when you publish in Sanity.",
            },
          ],
        },
      ],
    },
  ]

  for (const post of posts) {
    await client.createOrReplace(post)
  }

  // 4. Seed Experiences
  console.log('Seeding Experiences...')
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
      order: 2,
    },
  ]

  for (const exp of experiences) {
    await client.createOrReplace(exp)
  }

  // 5. Seed Skills
  console.log('Seeding Skill Categories...')
  const skillCategories = [
    {
      _id: 'cat-1',
      _type: 'skillCategory',
      title: 'Custom Web Applications',
      description:
        'High-performance web applications and internal tools designed for complex business operations.',
      skills: [
        { _key: 's1', name: 'Next.js / React 19', proficiency: 95 },
        { _key: 's2', name: 'TypeScript', proficiency: 92 },
        { _key: 's3', name: 'Tailwind CSS', proficiency: 95 },
        { _key: 's4', name: 'Sanity CMS', proficiency: 94 },
      ],
      order: 1,
    },
    {
      _id: 'cat-2',
      _type: 'skillCategory',
      title: 'AI Workflows & Automation',
      description:
        'Practical LLM integrations and automated extraction pipelines that eliminate operational busywork.',
      skills: [
        { _key: 's1', name: 'LLM APIs & Prompt Systems', proficiency: 88 },
        { _key: 's2', name: 'Python & FastAPI', proficiency: 85 },
        { _key: 's3', name: 'Document Parsing & OCR', proficiency: 90 },
        { _key: 's4', name: 'Webhook Dispatchers', proficiency: 92 },
      ],
      order: 2,
    },
    {
      _id: 'cat-3',
      _type: 'skillCategory',
      title: 'Cloud Systems & Databases',
      description:
        'Resilient database design, headless CMS architecture, and serverless cloud deployments.',
      skills: [
        { _key: 's1', name: 'PostgreSQL & Supabase', proficiency: 90 },
        { _key: 's2', name: 'Sanity Studio', proficiency: 92 },
        { _key: 's3', name: 'Docker & Containerization', proficiency: 85 },
        { _key: 's4', name: 'REST & GraphQL APIs', proficiency: 92 },
      ],
      order: 3,
    },
  ]

  for (const cat of skillCategories) {
    await client.createOrReplace(cat)
  }

  // 6. Seed Social Links
  console.log('Seeding Social Links...')
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

  console.log('✨ All content successfully seeded into Sanity dataset: production!')
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
