import { defineType, defineField } from 'sanity'

/**
 * Localized string for short text (titles, names)
 */
export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  options: {
    collapsible: false,
  },
})

/**
 * Localized text for longer content (descriptions, excerpts)
 */
export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
  options: {
    collapsible: false,
  },
})

/**
 * Localized rich text for full articles (Portable Text)
 */
export const localizedRichText = defineType({
  name: 'localizedRichText',
  title: 'Localized Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
  ],
})
