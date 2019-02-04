import gql from 'graphql-tag';
import { ContentItem } from '@apollosproject/data-connector-rock';
import { get } from 'lodash';

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
    htmlContent: async ({ attributeValues }, _, { dataSources }) => {
      const personAlias = get(attributeValues, 'person.value', null);
      if (personAlias) {
        const person = await dataSources.Person.getFromAlias(personAlias);
        const jobTitle = get(person, 'attributeValues.jobTitle.value', '');
        const bio = get(person, 'attributeValues.bio.value', '');

        return `<strong>${jobTitle}</strong><p>${bio}</p>`;
      }
      return '';
    },
    summary: async ({ attributeValues }, _, { dataSources }) => {
      const personAlias = get(attributeValues, 'person.value', null);
      if (personAlias) {
        const person = await dataSources.Person.getFromAlias(personAlias);

        return get(person, 'attributeValues.jobTitle.value', '');
      }
      return '';
    },

    person: ({ attributeValues }, _, { dataSources }) => {
      if (attributeValues.person.value) {
        return dataSources.Person.getFromAlias(attributeValues.person.value);
      }
      return null;
    },
  },
};
