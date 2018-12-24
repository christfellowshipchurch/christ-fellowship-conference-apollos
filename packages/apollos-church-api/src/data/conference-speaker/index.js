import gql from 'graphql-tag';
import { ContentItem } from '@apollosproject/data-connector-rock';

export { default as dataSource } from './data-source';

// export { default as schema } from './schema';
// export { default as resolver } from './resolver';

export const schema = gql`
  type ConferenceSpeakerContentItem implements ContentItem & Node {
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

    person: Person
    personId: Int
  }
`;

export const resolver = {
  ConferenceSpeakerContentItem: {
    ...ContentItem.resolver.UniversalContentItem,
    person: ({ attributeValues }, _, { dataSources }) => {
      if (attributeValues.person.value) {
        return dataSources.Person.getFromAlias(attributeValues.person.value);
      }
      return null;
    },
  },
};
