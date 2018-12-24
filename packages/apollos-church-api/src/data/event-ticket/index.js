import gql from 'graphql-tag';
import { ContentItem } from '@apollosproject/data-connector-rock';

export { default as dataSource } from './data-source';

// export { default as schema } from './schema';
// export { default as resolver } from './resolver';

export const schema = gql`
  type EventTicketContentItem implements Node & ContentItem {
    id: ID!
    title: String
    coverImage: ImageMedia
    images: [ImageMedia]
    videos: [VideoMedia]
    audios: [AudioMedia]
    htmlContent: String
    summary: String
    childContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    siblingContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    parentChannel: ContentChannel

    theme: Theme

    startDateTime: String

    ticketPrice: String
    registration: String
    color: String
  }
`;

export const resolver = {
  EventTicketContentItem: {
    ...ContentItem.resolver.UniversalContentItem,
    startDateTime: ({ startDateTime, attributeValues }) => {
      console.log('Logging Attr Values: ', attributeValues);
      return startDateTime;
    },

    ticketPrice: ({ attributeValues }) => attributeValues.price.value,
    registration: ({ attributeValues }) => attributeValues.registration.value,
    color: ({ attributeValues }) => attributeValues.color.value,
  },
};
