import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'development',
  },
  studioHost: process.env.SANITY_STUDIO_HOST,
  deployment: process.env.SANITY_STUDIO_APP_ID
    ? {
        appId: process.env.SANITY_STUDIO_APP_ID,
        autoUpdates: false,
      }
    : undefined,
})
