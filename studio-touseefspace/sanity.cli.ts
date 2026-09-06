import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '52hp81x4',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: false,
  },
})
