import { ContentChannel } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';
import dataSource from './data-source';

export { dataSource };

export const schema = gql`
  ${ContentChannel.schema}

  extend type Query {
    getAllContentChannels: [ContentChannel]
  }
`;

export const resolver = {
  ...ContentChannel.resolver,
  Query: {
    ...ContentChannel.resolver.Query,
    getAllContentChannels: (root, args, context) =>
      context.dataSources.ContentChannel.all(),
  },
};
