import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { HomeIcon } from '@sanity/icons/Home'
import { ProjectsIcon } from '@sanity/icons/Projects'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { CaseIcon } from '@sanity/icons/Case'
import { UlistIcon } from '@sanity/icons/Ulist'
import { LinkIcon } from '@sanity/icons/Link'

export default defineConfig({
  name: 'default',
  title: 'touseefspace',

  projectId: '52hp81x4',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Portfolio Content')
          .items([
            // Singleton: Home Page
            S.listItem()
              .title('Home Page Hero')
              .icon(HomeIcon)
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('Home Page Hero & Settings')
              ),

            S.divider(),

            // Projects & Selected Work
            S.listItem()
              .title('Projects & Case Studies')
              .icon(ProjectsIcon)
              .child(
                S.documentTypeList('project')
                  .title('All Projects')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),

            // Blog & Notes
            S.listItem()
              .title('Blog Posts & Articles')
              .icon(DocumentTextIcon)
              .child(
                S.documentTypeList('post')
                  .title('Blog Posts')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),

            S.divider(),

            // Experience & Education
            S.listItem()
              .title('Experience & Education')
              .icon(CaseIcon)
              .child(
                S.documentTypeList('experience')
                  .title('Experience Records')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),

            // Skills
            S.listItem()
              .title('Skill Categories')
              .icon(UlistIcon)
              .child(
                S.documentTypeList('skillCategory')
                  .title('Skill Categories')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),

            // Social Links
            S.listItem()
              .title('Social & Contact Links')
              .icon(LinkIcon)
              .child(
                S.documentTypeList('socialLink')
                  .title('Social Links')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
          ]),
    }),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
