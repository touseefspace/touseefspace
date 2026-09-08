import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Resolve SANITY_TOKEN
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
  console.error('❌ Error: SANITY_TOKEN environment variable is required.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '52hp81x4',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2026-02-01',
  token,
  useCdn: false,
})

async function runCleanup() {
  console.log('🧹 Starting Sanity deduplication and cleanup...')

  // 1. Delete duplicate project-ai-workflow-suite (published and draft)
  const duplicateProjectIds = ['project-ai-workflow-suite', 'drafts.project-ai-workflow-suite']
  for (const id of duplicateProjectIds) {
    try {
      await client.delete(id)
      console.log(`✅ Deleted duplicate project: ${id}`)
    } catch (err: any) {
      if (err.statusCode === 404) {
        console.log(`ℹ️ Project ${id} already does not exist.`)
      } else {
        console.warn(`⚠️ Could not delete ${id}:`, err.message)
      }
    }
  }

  // 2. Delete legacy categories if they exist (cat-1, cat-2, cat-3)
  const legacyCatIds = [
    'cat-1',
    'cat-2',
    'cat-3',
    'drafts.cat-1',
    'drafts.cat-2',
    'drafts.cat-3',
  ]
  for (const id of legacyCatIds) {
    try {
      await client.delete(id)
      console.log(`✅ Deleted legacy category: ${id}`)
    } catch (err: any) {
      if (err.statusCode === 404) {
        console.log(`ℹ️ Category ${id} already does not exist.`)
      } else {
        console.warn(`⚠️ Could not delete ${id}:`, err.message)
      }
    }
  }

  // 3. Verify clean state
  console.log('\n🔍 Verifying clean state in Sanity dataset: production...')
  const projects = await client.fetch<any[]>(
    '*[_type == "project"] | order(title asc) { _id, title, "slug": slug.current, _createdAt }'
  )
  console.log(`\nRemaining Projects (${projects.length}):`)
  projects.forEach((p, i) => {
    console.log(`  ${i + 1}. [${p._id}] "${p.title}" (slug: ${p.slug})`)
  })

  const categories = await client.fetch<any[]>(
    '*[_type == "skillCategory"] | order(order asc) { _id, title, order, "skillsCount": count(*[_type == "skill" && category._ref == ^._id]) }'
  )
  console.log(`\nRemaining Categories (${categories.length}):`)
  categories.forEach((c, i) => {
    console.log(`  ${i + 1}. [${c._id}] "${c.title}" (skills: ${c.skillsCount})`)
  })

  const totalSkills = await client.fetch<number>('count(*[_type == "skill"])')
  console.log(`\nTotal Normalized Skills: ${totalSkills}`)

  console.log('\n✨ Sanity cleanup complete!')
}

runCleanup().catch(console.error)
