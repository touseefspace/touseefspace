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

const lightDir = path.resolve(__dirname, '../category_icons')
const darkDir = path.resolve(__dirname, '../category_icons_dark')

if (!fs.existsSync(darkDir)) {
  fs.mkdirSync(darkDir, { recursive: true })
}

const categoryIconMap: Record<string, string> = {
  'cat-web': 'code-xml.svg',
  'cat-ai': 'cpu.svg',
  'cat-cloud': 'database.svg',
  'cat-devops': 'cloud.svg',
  'cat-tools': 'paintbrush.svg',
  'cat-mobile': 'smartphone.svg',
}

async function uploadFile(filePath: string, filename: string): Promise<string> {
  const stream = fs.createReadStream(filePath)
  const asset = await client.assets.upload('image', stream, { filename })
  return asset._id
}

async function main() {
  console.log('🌓 Generating dark mode SVGs and updating Sanity categories...')

  for (const [catId, iconFile] of Object.entries(categoryIconMap)) {
    const lightPath = path.join(lightDir, iconFile)
    const darkPath = path.join(darkDir, iconFile)

    if (!fs.existsSync(lightPath)) {
      console.warn(`⚠️ Light icon missing: ${lightPath}`)
      continue
    }

    // Generate dark SVG with stroke="#F4F4F5"
    let lightSvg = fs.readFileSync(lightPath, 'utf8')
    let darkSvg = lightSvg.replace(/stroke="currentColor"/g, 'stroke="#F4F4F5"')
    fs.writeFileSync(darkPath, darkSvg, 'utf8')
    console.log(`✅ Created dark SVG: ${darkPath}`)

    // Upload light and dark assets to Sanity
    const lightAssetId = await uploadFile(lightPath, `light-${iconFile}`)
    const darkAssetId = await uploadFile(darkPath, `dark-${iconFile}`)

    // Patch category document
    await client
      .patch(catId)
      .set({
        iconLight: {
          _type: 'image',
          asset: { _type: 'reference', _ref: lightAssetId },
        },
        iconDark: {
          _type: 'image',
          asset: { _type: 'reference', _ref: darkAssetId },
        },
      })
      .commit()

    console.log(`✨ Patched ${catId} with light (${lightAssetId}) and dark (${darkAssetId}) assets.`)
  }

  console.log('\n🎉 Category icons dark mode upload complete!')
}

main().catch(console.error)
