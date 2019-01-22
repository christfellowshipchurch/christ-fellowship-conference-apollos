import { ApolloServer } from 'apollo-server';

import { resolvers, schema, testSchema, context, dataSources } from './data';

export { resolvers, schema, testSchema };

export default new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources,
  context,
  introspection: true,
  debug: true,
  tracing: process.env.NODE_ENV === 'development',
  cacheControl: {
    stripFormattedExtensions: false,
    calculateHttpHeaders: true,
    defaultMaxAge: 240,
  },
  formatError: (error) => {
    console.error(error.extensions.exception.stacktrace.join('\n'));
    return error;
  },
  playground: {
    settings: {
      'editor.cursorShape': 'line',
    },
  },
});
