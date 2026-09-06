import { defineType, defineField, defineArrayMember } from 'sanity'
import { CaseIcon } from '@sanity/icons/Case'

export const experience = defineType({
  name: 'experience',
  title: 'Experience & Education',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Work Experience', value: 'work' },
          { title: 'Education & Foundation', value: 'education' },
        ],
        layout: 'radio',
      },
      initialValue: 'work',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company or Institution',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role or Degree',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Timeline / Duration',
      type: 'string',
      description: 'e.g. 2023 - Present, 2020 - 2024',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. United Arab Emirates, Remote',
    }),
    defineField({
      name: 'description',
      title: 'Overview',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Organization Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tasks',
      title: 'Key Work & Responsibilities',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'task',
              title: 'Task / Focus Area',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'skillStack',
      title: 'Skills & Technologies',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'skill',
              title: 'Skill Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon (optional)',
              type: 'image',
            }),
          ],
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
      title: 'company',
      subtitle: 'role',
      media: 'logo',
    },
  },
})
