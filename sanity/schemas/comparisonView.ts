export default {
  name: 'comparisonView',
  type: 'document',
  title: 'Comparison View',
  fields: [
    {
      name: 'clause2024',
      type: 'reference',
      title: 'Clause 2024',
      to: [{ type: 'clause' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'clause2025',
      type: 'reference',
      title: 'Clause 2025',
      to: [{ type: 'clause' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'comparisonNotes',
      type: 'text',
      title: 'Comparison Notes',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'verdict',
      type: 'string',
      title: 'Verdict',
      options: {
        list: [
          { title: 'Better for Citizens', value: 'better' },
          { title: 'Worse for Citizens', value: 'worse' },
          { title: 'Neutral Change', value: 'neutral' },
          { title: 'Mixed Impact', value: 'mixed' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    }
  ]
}