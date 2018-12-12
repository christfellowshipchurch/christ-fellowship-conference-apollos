import { gql } from 'apollo-server';

import { createApolloServerConfig } from '@apollosproject/server-core';

import * as Auth from '@apollosproject/data-connector-rock-auth';
import {
  ContentChannel,
  Sharable,
} from '@apollosproject/data-connector-rock-content';
import * as Analytics from '@apollosproject/data-connector-analytics';
import { Person, Family } from '@apollosproject/data-connector-people';
import * as Scripture from '@apollosproject/data-connector-bible';
import * as LiveStream from '@apollosproject/data-connector-church-online';
import {
  Followings,
  Interactions,
  RockConstants,
} from '@apollosproject/data-connector-rock-actions';
import * as Theme from './theme';

import * as ContentItem from './content-items';
import * as EventTicketContentItem from './event-ticket';

const data = {
  Followings,
  ContentChannel,
  ContentItem,
  Person,
  Auth,
  LiveStream,
  Theme,
  Scripture,
  Interactions,
  RockConstants,
  Sharable,
  Analytics,
  Family,
  UniversalContentItem: ContentItem, // alias
  DevotionalContentItem: ContentItem, // alias
  ContentSeriesContentItem: ContentItem, // alias
  MediaContentItem: ContentItem, // alias
  EventTicketContentItem,
};

const { dataSources, resolvers, schema, context } = createApolloServerConfig(
  data
);

export { dataSources, resolvers, schema, context };

// the upload Scalar is added
export const testSchema = [
  gql`
    scalar Upload
  `,
  ...schema,
];
