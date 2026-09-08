import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '52hp81x4',
    dataset: 'production'
  },
  studioHost: 'touseefspace',
  deployment: {
    appId: 'npq7v2ijixsspi6uxbsaq1cs',
    autoUpdates: false,
  },
})
