export default {
  name: 'taxRule',
  type: 'document',
  title: 'Tax Rule',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Rule Name',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'year',
      type: 'number',
      title: 'Year',
      validation: (Rule: any) => Rule.required().min(2024).max(2025)
    },
    {
      name: 'ruleFormula',
      type: 'text',
      title: 'Rule Formula',
      description: 'JSON format of the calculation rule',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'appliesTo',
      type: 'string',
      title: 'Applies To',
      validation: (Rule: any) => Rule.required()
    }
  ]
}