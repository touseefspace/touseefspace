import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons/Home'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page Settings',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main statement above the fold.',
      initialValue: 'I turn messy workflows into simple & reliable software spaces.',
    }),
    defineField({
      name: 'role',
      title: 'Professional Role / Title',
      type: 'string',
      description: 'Primary title displayed across the site, author cards, and metadata.',
      initialValue: 'AI Systems and Software Developer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Hero Description / Bio',
      type: 'text',
      rows: 3,
      initialValue:
        'Developing custom web applications and AI systems engineered to eliminate operational clutter — giving ambitious teams the space to scale with calm, dependable reliability.',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait / Hero Visual',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          initialValue: 'Touseef Ahmed',
        },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location Tag',
      type: 'string',
      initialValue: 'United Arab Emirates',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'portrait',
    },
  },
})
