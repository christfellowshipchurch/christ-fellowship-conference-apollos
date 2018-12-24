import { ContentChannel } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';

export const { dataSource } = ContentChannel;

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
