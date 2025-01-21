const schema = {
  type: 'object',
  description: 'The reponse',
  properties: {
    role: {
      type: 'string',
      description: 'AI Model',
    },
    content: {
      type: 'string',
      description: 'The reponse in Mardown format.',
    },
    id: {
      type: 'number',
      description: 'Random number for id',
    },
  },
};

export default schema;
