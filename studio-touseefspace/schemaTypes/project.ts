import { defineType, defineField, defineArrayMember } from 'sanity'
import { ProjectsIcon } from '@sanity/icons/Projects'

export const project = defineType({
  name: 'project',
  title: 'Projects & Case Studies',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client / Context',
      type: 'string',
      description: 'e.g., Regional Wholesale Distribution, B2B SaaS Services',
    }),
    defineField({
      name: 'role',
      title: 'Your Role',
      type: 'string',
      description: 'e.g., Lead Full Stack Architect, AI & Systems Engineer',
    }),
    defineField({
      name: 'period',
      title: 'Timeline / Duration',
      type: 'string',
      description: 'e.g., 2024 - 2025',
    }),
    defineField({
      name: 'summary',
      title: 'Elevator Summary',
      type: 'text',
      rows: 2,
      description: 'Concise 1-2 sentence description of the product and business context.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'problem',
      title: 'Business Problem & Operational Friction',
      type: 'text',
      rows: 3,
      description: 'What operational pain, manual bottleneck, or discrepancy did the client face?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solution',
      title: 'Engineered Solution & Key Decisions',
      type: 'text',
      rows: 3,
      description: 'How was the system architected to solve the friction reliably?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'outcome',
      title: 'Measurable Impact & Results',
      type: 'text',
      rows: 3,
      description: 'Quantifiable business results achieved after delivery.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metrics',
      title: 'Key Quantified Metrics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Metric Value (e.g. 80%, <150ms, 12)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Description (e.g. Audit Time Cut, Branches Unified)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Main Preview Image / Mockup',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies & Stack',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Technology Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon (Optional SVG/PNG)',
              type: 'image',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Key Engineering Features',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'body',
      title: 'Deep-Dive Case Study Narrative',
      type: 'blockContent',
      description: 'Full architectural breakdown, diagrams, code snippets, and key learnings for /work/[slug].',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Application URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage (Selected Work)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'image',
    },
  },
})
