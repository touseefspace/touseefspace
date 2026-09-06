import { defineType, defineArrayMember } from 'sanity'

/**
 * Rich text / Portable Text schema used across blog posts and case studies.
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineArrayMember({
      name: 'codeBlock',
      title: 'Code Block',
      type: 'object',
      fields: [
        {
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'Python', value: 'python' },
              { title: 'Bash / Shell', value: 'bash' },
              { title: 'SQL', value: 'sql' },
              { title: 'JSON', value: 'json' },
              { title: 'CSS', value: 'css' },
              { title: 'HTML', value: 'html' },
            ],
          },
          initialValue: 'typescript',
        },
        {
          name: 'filename',
          title: 'Filename / Label (optional)',
          type: 'string',
        },
        {
          name: 'code',
          title: 'Code',
          type: 'text',
          rows: 10,
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineArrayMember({
      name: 'callout',
      title: 'Callout / Note',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'Note / Info', value: 'info' },
              { title: 'Tip', value: 'tip' },
              { title: 'Warning', value: 'warning' },
              { title: 'Success', value: 'success' },
            ],
          },
          initialValue: 'info',
        },
        {
          name: 'title',
          title: 'Title (optional)',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
})
