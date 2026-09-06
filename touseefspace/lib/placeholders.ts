/**
 * High-fidelity fallback placeholder data.
 * Used whenever Payload CMS collections are empty or during local development,
 * ensuring the portfolio is always 100% complete, readable, and beautiful.
 */

export const placeholderProjects = [
  {
    id: "aunvu-erp",
    title: "Aunvu / MISBAH ERP Platform",
    slug: "aunvu-erp",
    client: "Regional Wholesale Distribution",
    role: "Lead Full Stack Architect",
    period: "2024 - 2025",
    summary: "A multi-branch inventory, sales reconciliation, and automated operational reporting system.",
    problem: "Branch managers tracked regional stock across 12 warehouses using disconnected spreadsheets, causing 2-day inventory sync delays and recurring inventory discrepancies.",
    solution: "Architected a real-time event-driven ERP with a central PostgreSQL ledger, barcode scanning workflows, and granular role-based permissions.",
    outcome: "Cut inventory reconciliation time by 80% and eliminated unaccounted stock discrepancies across all 12 regional warehouses.",
    metrics: [
      { label: "Audit Time Cut", value: "80%" },
      { label: "Branches Unified", value: "12" },
      { label: "Sync Latency", value: "<150ms" },
    ],
    technologies: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "Payload CMS" },
      { name: "Tailwind CSS" },
    ],
    image: {
      url: "/placeholders/aunvu-dashboard.svg",
      alt: "Aunvu ERP Platform Dashboard",
    },
    githubUrl: "https://github.com/touseefspace",
    featured: true,
  },
  {
    id: "ai-workflow-suite",
    title: "AI Document & Workflow Engine",
    slug: "ai-workflow-engine",
    client: "Logistics & Compliance Client",
    role: "AI & Full Stack Engineer",
    period: "2024",
    summary: "Intelligent document parsing, tax validation, and automated accounting workflow dispatch.",
    problem: "The operations team spent over 15 hours every week manually transcribing and reconciling complex multi-page invoices from international suppliers.",
    solution: "Built an automated OCR and LLM pipeline that extracts structured line-item data, validates taxes against regional standards, and syncs directly into the ledger.",
    outcome: "Eliminated manual transcription errors with a 99.2% extraction accuracy rate, saving the business 15+ operational hours every week.",
    metrics: [
      { label: "Hours Saved Weekly", value: "15h+" },
      { label: "Extraction Accuracy", value: "99.2%" },
      { label: "Turnaround Time", value: "<10s" },
    ],
    technologies: [
      { name: "Python" },
      { name: "OpenAI API" },
      { name: "Next.js" },
      { name: "FastAPI" },
      { name: "Docker" },
    ],
    image: {
      url: "/placeholders/ai-workflow.svg",
      alt: "AI Document & Workflow Engine",
    },
    githubUrl: "https://github.com/touseefspace",
    featured: true,
  },
  {
    id: "client-portal-saas",
    title: "Real-Time Client Analytics Portal",
    slug: "client-portal-saas",
    client: "B2B SaaS Services",
    role: "Full Stack Developer",
    period: "2023 - 2024",
    summary: "High-performance collaborative client dashboard with real-time telemetry and reporting.",
    problem: "Clients lacked self-service visibility into their service health and deliverable timelines, creating high support volume via email chains.",
    solution: "Engineered a reactive portal featuring live telemetry updates via Server-Sent Events, interactive charts, and instant exportable PDF reports.",
    outcome: "Reduced client status inquiry tickets by 76% and boosted client retention by 35% in the first two quarters.",
    metrics: [
      { label: "Ticket Reduction", value: "-76%" },
      { label: "Client Retention", value: "+35%" },
      { label: "Telemetry Latency", value: "180ms" },
    ],
    technologies: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Supabase" },
      { name: "Tailwind CSS" },
      { name: "TypeScript" },
    ],
    image: {
      url: "/placeholders/client-portal.svg",
      alt: "Real-Time Client Analytics Portal",
    },
    githubUrl: "https://github.com/touseefspace",
    featured: true,
  },
];

export const placeholderExperiences = [
  {
    id: "exp-1",
    category: "work",
    company: "Custom Web & AI Solutions",
    role: "AI Systems and Software Developer",
    time: "2023 - Present",
    location: "United Arab Emirates",
    description: "Designing, engineering, and shipping custom business web applications, ERPs, and automated AI workflows for private clients.",
    tasks: [
      { task: "Architected end-to-end web applications with Next.js, TypeScript, and relational databases for retail and logistics clients." },
      { task: "Integrated LLM pipelines for automated data extraction, reducing client manual operations by 80%." },
      { task: "Constructed headless CMS and API backends with robust role-based security." },
    ],
  },
  {
    id: "exp-2",
    category: "education",
    company: "Computer Science Degree",
    role: "B.S. in Computer Science",
    time: "Foundational",
    location: "Academic Foundation",
    description: "Rigorous education in software design principles, algorithms, distributed databases, and computational systems.",
    tasks: [
      { task: "Specialized in software architecture, database management systems, and system design." },
      { task: "Delivered multiple full-stack capstone projects and open-source utilities." },
    ],
  },
];

export const placeholderSkillCategories = [
  {
    id: "cat-1",
    title: "Custom Web Applications",
    description: "High-performance web applications and internal tools designed for complex business operations.",
    skills: [
      { name: "Next.js / React 19", proficiency: 95 },
      { name: "TypeScript", proficiency: 92 },
      { name: "Tailwind CSS", proficiency: 95 },
      { name: "State Architecture", proficiency: 90 },
    ],
  },
  {
    id: "cat-2",
    title: "AI Workflows & Automation",
    description: "Practical LLM integrations and automated extraction pipelines that eliminate operational busywork.",
    skills: [
      { name: "LLM APIs & Prompt Systems", proficiency: 88 },
      { name: "Python & LangChain", proficiency: 85 },
      { name: "Document Parsing & OCR", proficiency: 90 },
      { name: "Webhook Dispatchers", proficiency: 92 },
    ],
  },
  {
    id: "cat-3",
    title: "Cloud Systems & Databases",
    description: "Resilient database design, headless CMS architecture, and serverless cloud deployments.",
    skills: [
      { name: "PostgreSQL & Supabase", proficiency: 90 },
      { name: "Payload CMS", proficiency: 92 },
      { name: "Docker & Containerization", proficiency: 85 },
      { name: "REST & GraphQL APIs", proficiency: 92 },
    ],
  },
];

export const placeholderSocialLinks = [
  {
    id: "soc-1",
    name: "GitHub",
    url: "https://github.com/touseefspace",
    username: "@touseefspace",
  },
  {
    id: "soc-2",
    name: "LinkedIn",
    url: "https://linkedin.com/in/touseefspace",
    username: "touseefspace",
  },
  {
    id: "soc-3",
    name: "X (Twitter)",
    url: "https://x.com/touseefspace",
    username: "@touseefspace",
  },
  {
    id: "soc-4",
    name: "Instagram",
    url: "https://instagram.com/touseef.space",
    username: "@touseef.space",
  },
  {
    id: "soc-5",
    name: "Facebook",
    url: "https://www.facebook.com/share/1EZZSty9e1/",
    username: "touseefspace",
  },
  {
    id: "soc-6",
    name: "WhatsApp",
    url: "https://wa.me/971544317175",
    username: "+971 54 431 7175",
  },
  {
    id: "soc-7",
    name: "Email",
    url: "mailto:hello@touseefspace.com",
    username: "hello@touseefspace.com",
  },
];

export const placeholderHomeData = {
  hero: {
    title: "I turn messy workflows into simple & reliable software spaces.",
    role: "AI Systems and Software Developer",
    description: "Developing custom web applications and AI systems engineered to eliminate operational clutter — giving ambitious teams the space to scale with calm, dependable reliability.",
    portrait: {
      url: "/touseef.png",
    },
  },
};

export const placeholderPosts = [
  {
    _id: "post-event-driven-erp",
    id: "post-event-driven-erp",
    title: "Engineering Event-Driven ERP Systems with Next.js & PostgreSQL",
    slug: "engineering-event-driven-erp-systems",
    publishedAt: "2026-02-15T09:00:00.000Z",
    excerpt:
      "How we replaced error-prone spreadsheet synchronization with an immutable transaction ledger, sub-150ms real-time sync, and optimistic barcode scanning in warehouse environments.",
    estimatedReadTime: "6 min read",
    tags: ["Next.js", "PostgreSQL", "Architecture", "Systems"],
    featured: true,
    body: [
      {
        _key: "p1",
        _type: "block",
        style: "h2",
        children: [{ _key: "t1", _type: "span", text: "Why Traditional CRUD Fails in High-Velocity Inventory" }],
      },
      {
        _key: "p2",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "t2",
            _type: "span",
            text: "In standard web applications, updating product stock is often modeled as `UPDATE products SET stock = stock - 1 WHERE id = 123`. In an enterprise wholesale business with 12 simultaneous regional warehouses and barcode scanners operating at rapid velocity, concurrent database updates will inevitably result in phantom inventory, race conditions, and locked tables.",
          },
        ],
      },
      {
        _key: "p3",
        _type: "callout",
        type: "tip",
        title: "The Ledger Principle",
        content:
          "Never mutate current stock numbers directly. Treat stock as an immutable ledger: every scan is a transaction, and current stock is a derived projection.",
      },
      {
        _key: "p4",
        _type: "block",
        style: "h2",
        children: [{ _key: "t3", _type: "span", text: "Optimistic UI for Barcode Readers" }],
      },
      {
        _key: "p5",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "t4",
            _type: "span",
            text: "Warehouse operators scan boxes at an average rate of one item every 1.5 seconds. Waiting for server roundtrips kills throughput. By implementing optimistic mutations in React with rollback reconciliation queues, scanning remains butter-smooth even on patchy warehouse Wi-Fi.",
          },
        ],
      },
      {
        _key: "p6",
        _type: "codeBlock",
        language: "typescript",
        filename: "useOptimisticScan.ts",
        code: `export function useOptimisticScan() {\n  const [queue, setQueue] = useState<ScanItem[]>([]);\n\n  const handleScan = async (barcode: string) => {\n    const tempId = crypto.randomUUID();\n    // 1. Immediately acknowledge in UI\n    setQueue(prev => [...prev, { tempId, barcode, status: 'pending' }]);\n    \n    // 2. Dispatch in background\n    try {\n      await dispatchLedgerScan(barcode);\n      setQueue(prev => prev.filter(item => item.tempId !== tempId));\n    } catch (err) {\n      markAsFailed(tempId);\n    }\n  };\n  return { queue, handleScan };\n}`,
      },
    ],
  },
  {
    _id: "post-practical-llm-document-extraction",
    id: "post-practical-llm-document-extraction",
    title: "Practical Document Extraction Pipelines with Python & Structured Outputs",
    slug: "practical-document-extraction-pipelines",
    publishedAt: "2026-01-20T11:30:00.000Z",
    excerpt:
      "Designing zero-hallucination structured invoice parsing pipelines with 99.2% accuracy and sub-10 second turnaround times.",
    estimatedReadTime: "5 min read",
    tags: ["AI Workflows", "Python", "Automation", "LLMs"],
    featured: false,
    body: [
      {
        _key: "p1",
        _type: "block",
        style: "h2",
        children: [{ _key: "t1", _type: "span", text: "Taming Unstructured Supplier PDFs" }],
      },
      {
        _key: "p2",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "t2",
            _type: "span",
            text: "Extracting data from multi-page PDFs using naive text prompts frequently causes hallucinated line items or formatted dollar amounts that fail downstream financial validation. The key to 99.2% accuracy is schema-constrained structured outputs combined with deterministic tax rule verification.",
          },
        ],
      },
      {
        _key: "p3",
        _type: "callout",
        type: "info",
        title: "Two-Stage Verification",
        content:
          "Stage 1 uses an LLM to extract JSON matching strict Pydantic schemas. Stage 2 executes deterministic math (unit price * qty == line total) and rejects mathematical inconsistencies back to human review.",
      },
    ],
  },
  {
    _id: "post-nextjs-16-caching",
    id: "post-nextjs-16-caching",
    title: "Next.js 16 Caching in Production: cacheLife, cacheTag, and Edge Freshness",
    slug: "nextjs-16-caching-in-production",
    publishedAt: "2025-12-10T14:15:00.000Z",
    excerpt:
      "A deep dive into Next.js 16 cache directives, avoiding cache invalidation cascades, and pairing headless CMS with edge revalidation.",
    estimatedReadTime: "7 min read",
    tags: ["Next.js", "Performance", "Web Development"],
    featured: false,
    body: [
      {
        _key: "p1",
        _type: "block",
        style: "h2",
        children: [{ _key: "t1", _type: "span", text: "The Evolution of App Router Caching" }],
      },
      {
        _key: "p2",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "t2",
            _type: "span",
            text: "Next.js 16 introduced clean primitives like 'use cache', cacheTag, and cacheLife. By structuring your CMS queries with semantic tags (such as 'projects', 'posts', 'social-links'), edge caches remain instant for visitors while instant on-demand revalidation triggers when you publish in Sanity.",
          },
        ],
      },
    ],
  },
];
