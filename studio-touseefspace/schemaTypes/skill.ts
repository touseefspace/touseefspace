import { defineType, defineField } from 'sanity'
import { SparklesIcon } from '@sanity/icons/Sparkles'

export const skill = defineType({
  name: 'skill',
  title: 'Skills & Technologies',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Skill / Technology Name',
      type: 'string',
      description: 'e.g., Next.js, TypeScript, PostgreSQL, Python',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'skillCategory' }],
      description: 'The parent category this skill belongs to for the /skills directory.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Technology Icon / Logo',
      type: 'image',
      description: 'SVG or transparent PNG recommended.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency (0 - 100)',
      type: 'number',
      description: 'Optional proficiency rating for the /skills visual gauge.',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'iconDark',
      title: 'Dark Mode Icon Override',
      type: 'image',
      description: 'Optional override for dark mode if contrasting assets are needed.',
    }),
    defineField({
      name: 'iconLight',
      title: 'Light Mode Icon Override',
      type: 'image',
      description: 'Optional override for light mode.',
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
      subtitle: 'category.title',
      media: 'icon',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Category: ${subtitle}` : 'Uncategorized',
        media,
      }
    },
  },
})
