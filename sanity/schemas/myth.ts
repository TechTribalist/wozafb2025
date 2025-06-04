export default {
  name: 'myth',
  type: 'document',
  title: 'Myth',
  fields: [
    {
      name: 'statement',
      type: 'string',
      title: 'Myth Statement',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'verdict',
      type: 'string',
      title: 'Verdict',
      options: {
        list: [
          { title: 'True', value: 'true' },
          { title: 'False', value: 'false' },
          { title: 'Partially True', value: 'partial' },
          { title: 'Misleading', value: 'misleading' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'explanation',
      type: 'text',
      title: 'Explanation',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'sources',
      type: 'array',
      title: 'Sources',
      of: [{ type: 'url' }]
    },
    {
      name: 'linkedClauses',
      type: 'array',
      title: 'Linked Clauses',
      of: [{ type: 'reference', to: [{ type: 'clause' }] }]
    },
    {
      name: 'relatedCalculator',
      type: 'string',
      title: 'Related Calculator'
    }
  ]
}