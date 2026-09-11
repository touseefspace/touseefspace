import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Resolve SANITY_TOKEN from environment or touseefspace/.env / .env.local
let token = process.env.SANITY_TOKEN
if (!token) {
  const envFiles = [
    path.resolve(__dirname, '../../touseefspace/.env.local'),
    path.resolve(__dirname, '../../touseefspace/.env'),
  ]
  for (const file of envFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      const match = content.match(/SANITY_TOKEN=["']?([^"'\r\n]+)["']?/)
      if (match) {
        token = match[1]
        break
      }
    }
  }
}

if (!token) {
  console.error('❌ Error: SANITY_TOKEN is required. Set it in process.env or in touseefspace/.env')
  process.exit(1)
}

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '52hp81x4'
const apiVersion = '2026-02-01'

function getClient(dataset: string) {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })
}

const backupsDir = path.resolve(__dirname, '../backups')
if (!fs.existsSync(backupsDir)) {
  fs.mkdirSync(backupsDir, { recursive: true })
}

async function backupDataset(dataset: string): Promise<string> {
  const client = getClient(dataset)
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = path.join(backupsDir, `${dataset}-${timestamp}.json`)
  
  console.log(`📦 Creating backup for dataset "${dataset}"...`)
  const docs = await client.fetch('*')
  fs.writeFileSync(filename, JSON.stringify(docs, null, 2), 'utf8')
  console.log(`✅ Backed up ${docs.length} documents from "${dataset}" to ${filename}`)
  return filename
}

async function syncDatasets(sourceDataset: string, targetDataset: string) {
  console.log(`\n========================================`)
  console.log(`🔄 Syncing Sanity Dataset: ${sourceDataset} ➔ ${targetDataset}`)
  console.log(`========================================\n`)

  const sourceClient = getClient(sourceDataset)
  const targetClient = getClient(targetDataset)

  // Safety backup before any modifications
  console.log(`Step 1: Creating safety backups...`)
  await backupDataset(targetDataset)
  await backupDataset(sourceDataset)

  console.log(`\nStep 2: Fetching content documents from "${sourceDataset}"...`)
  const allDocs: any[] = await sourceClient.fetch('*')
  const sourceDocs = allDocs.filter(
    (doc) =>
      !doc._id?.startsWith('_.') &&
      !doc._type?.startsWith('system.')
  )
  console.log(`Fetched ${sourceDocs.length} content documents from "${sourceDataset}" (excluded ${allDocs.length - sourceDocs.length} system documents).`)

  if (sourceDocs.length === 0) {
    console.warn(`⚠️ Warning: No documents found in "${sourceDataset}". Aborting sync to prevent blanking target.`)
    return
  }

  console.log(`\nStep 3: Sorting documents by dependency order...`)
  const TYPE_ORDER: Record<string, number> = {
    'sanity.imageAsset': 1,
    'sanity.fileAsset': 1,
    'skillCategory': 2,
    'skill': 3,
    'socialLink': 4,
    'experience': 5,
    'project': 6,
    'post': 7,
    'homePage': 8,
  }

  sourceDocs.sort((a, b) => {
    const orderA = TYPE_ORDER[a._type] || 99
    const orderB = TYPE_ORDER[b._type] || 99
    return orderA - orderB
  })

  console.log(`\nStep 4: Migrating documents into "${targetDataset}" using createOrReplace batches...`)
  const chunkSize = 25
  let processed = 0

  for (let i = 0; i < sourceDocs.length; i += chunkSize) {
    const chunk = sourceDocs.slice(i, i + chunkSize)
    const transaction = targetClient.transaction()

    for (const doc of chunk) {
      transaction.createOrReplace(doc)
    }

    await transaction.commit()
    processed += chunk.length
    console.log(`  ✓ Synced ${processed}/${sourceDocs.length} documents...`)
  }

  const finalCount = await targetClient.fetch('count(*)')
  console.log(`\n🎉 Sync Complete! "${targetDataset}" now contains ${finalCount} documents.`)
}

async function main() {
  const command = process.argv[2] || 'sync-down'

  switch (command) {
    case 'backup-prod':
      await backupDataset('production')
      break

    case 'backup-dev':
      await backupDataset('development')
      break

    case 'sync-down':
      // Production -> Development (safe refresh of sandbox)
      await syncDatasets('production', 'development')
      break

    case 'sync-up':
      // Development -> Production (requires confirmation)
      if (!process.argv.includes('--confirm')) {
        console.error('❌ Refusing to sync to production without --confirm flag!')
        console.error('Run: npm run dataset:sync-up -- --confirm')
        process.exit(1)
      }
      await syncDatasets('development', 'production')
      break

    default:
      console.log(`Unknown command: ${command}`)
      console.log(`Available commands: backup-prod, backup-dev, sync-down, sync-up`)
      process.exit(1)
  }
}

main().catch((err) => {
  console.error('❌ Sync failed with error:', err)
  process.exit(1)
})
