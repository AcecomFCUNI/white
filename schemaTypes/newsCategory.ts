import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const newsCategory = defineType({
  name: 'newsCategory',
  title: 'News Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 50,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Badge Color',
      type: 'string',
      options: {
        list: [
          { title: 'Purple (Default)', value: 'purple' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Red', value: 'red' },
        ],
        layout: 'radio',
      },
      initialValue: 'purple',
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'slug.current',
    },
  },
})
