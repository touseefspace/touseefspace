import { defineType, defineField, defineArrayMember } from 'sanity'
import { UlistIcon } from '@sanity/icons/Ulist'

export const skillCategory = defineType({
  name: 'skillCategory',
  title: 'Skill Categories',
  type: 'document',
  icon: UlistIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      description: 'e.g., Custom Web Applications, AI Workflows & Automation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'iconDark',
      title: 'Dark Mode Icon (SVG/PNG)',
      type: 'image',
    }),
    defineField({
      name: 'iconLight',
      title: 'Light Mode Icon (SVG/PNG)',
      type: 'image',
    }),
    defineField({
      name: 'skills',
      title: 'Legacy Embedded Skills List (Optional)',
      description: 'Skills are now created as top-level documents under "Skills & Technologies" and linked directly to this category.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'skill' }],
          title: 'Skill Reference',
        }),
        defineArrayMember({
          type: 'object',
          title: 'Legacy Inline Skill',
          fields: [
            defineField({
              name: 'name',
              title: 'Skill Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'proficiency',
              title: 'Proficiency (0 - 100)',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(100),
            }),
            defineField({
              name: 'iconDark',
              title: 'Dark Mode Icon',
              type: 'image',
            }),
            defineField({
              name: 'iconLight',
              title: 'Light Mode Icon',
              type: 'image',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'proficiency',
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: subtitle ? `${subtitle}%` : undefined,
              }
            },
          },
        }),
      ],
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
      subtitle: 'description',
    },
  },
})
