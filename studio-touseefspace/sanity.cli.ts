import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '52hp81x4',
    dataset: process.env.SANITY_STUDIO_DATASET || 'development'
  },
  studioHost: 'touseefspace',
  deployment: {
    appId: 'npq7v2ijixsspi6uxbsaq1cs',
    autoUpdates: false,
  },
})
