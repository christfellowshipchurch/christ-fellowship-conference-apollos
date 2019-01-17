import { gql } from 'apollo-server';

import { createApolloServerConfig } from '@apollosproject/server-core';

import * as Analytics from '@apollosproject/data-connector-analytics';
import * as Scripture from '@apollosproject/data-connector-bible';
import * as LiveStream from '@apollosproject/data-connector-church-online';
import {
  Followings,
  Interactions,
  RockConstants,
  Family,
  Sharable,
} from '@apollosproject/data-connector-rock';
import * as Theme from './theme';

import * as ContentChannel from './content-channels';
import * as Auth from './extended-auth';
import * as AuthenticatedUser from './authenticated-user';
import * as ContentItem from './content-items';
import * as EventTicketContentItem from './event-ticket';
import * as ConferenceSpeakerContentItem from './conference-speaker';
import * as ConferenceGroupContentItem from './conference-group';
import * as Person from './rock-people';
import * as Group from './rock-groups';
import * as AppNavigationContentItem from './app-navigation';
import * as ConferenceScheduleContentItem from './conference-schedule';

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
  ConferenceSpeakerContentItem,
  ConferenceGroupContentItem,
  Group,
  AppNavigationContentItem,
  ConferenceScheduleContentItem,
  AuthenticatedUser,
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
