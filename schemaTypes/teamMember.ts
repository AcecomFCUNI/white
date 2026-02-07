import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 50,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Position',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'area',
      title: 'Team Area',
      type: 'string',
      options: {
        list: [
          { title: 'Directiva', value: 'leadership' },
          { title: 'STEM', value: 'stem' },
          { title: 'Diseño y Publicidad', value: 'design' },
          { title: 'Gestión y Logística', value: 'management' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'quote',
      title: 'Motivational Quote',
      type: 'localizedString',
      description: 'Short motivational or inspiring phrase (required for leadership)',
      hidden: ({ document }) => !document?.isLeadership,
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as { isLeadership?: boolean }
          const localized = value as { es?: string; en?: string } | undefined
          if (doc?.isLeadership && (!localized || (!localized.es && !localized.en))) {
            return 'Leadership members must have a motivational quote'
          }
          return true
        }),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'isLeadership',
      title: 'Leadership Position',
      type: 'boolean',
      description: 'Is this person in a leadership role?',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role.es',
      area: 'area',
      media: 'photo',
    },
    prepare({ title, role, area, media }) {
      const areaLabels: Record<string, string> = {
        leadership: '👔 Directiva',
        stem: '🔬 STEM',
        design: '🎨 Diseño',
        management: '📊 Gestión',
      }
      return {
        title,
        subtitle: `${role} • ${areaLabels[area] || area}`,
        media,
      }
    },
  },
})
