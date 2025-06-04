export default {
  name: 'clause',
  type: 'document',
  title: 'Clause',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'sectionNumber',
      type: 'string',
      title: 'Section Number',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'year',
      type: 'number',
      title: 'Year',
      validation: (Rule: any) => Rule.required().min(2024).max(2025)
    },
    {
      name: 'fullText',
      type: 'text',
      title: 'Full Text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'summary',
      type: 'text',
      title: 'Summary',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'impactLevel',
      type: 'string',
      title: 'Impact Level',
      options: {
        list: [
          { title: 'Beneficial', value: 'beneficial' },
          { title: 'Neutral', value: 'neutral' },
          { title: 'Costly', value: 'costly' }
        ]
      }
    },
    {
      name: 'linkedFacts',
      type: 'array',
      title: 'Linked Facts',
      of: [{ type: 'reference', to: [{ type: 'myth' }] }]
    },
    {
      name: 'linkedCalculations',
      type: 'array',
      title: 'Linked Calculations',
      of: [{ type: 'reference', to: [{ type: 'taxRule' }] }]
    }
  ]
}