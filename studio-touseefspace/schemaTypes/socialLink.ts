import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons/Link'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social & Contact Links',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Platform Name',
      type: 'string',
      description: 'e.g., GitHub, LinkedIn, WhatsApp, Email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'username',
      title: 'Username / Handle / Display',
      type: 'string',
      description: 'e.g., @touseefspace, hello@touseefspace.com',
    }),
    defineField({
      name: 'url',
      title: 'URL / Link',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
})
