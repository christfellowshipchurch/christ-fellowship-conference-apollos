import ApollosConfig from '@apollosproject/config';
import { createGlobalId } from '@apollosproject/server-core';

const { ROCK } = ApollosConfig;
const enforceProtocol = (uri) => (uri.startsWith('//') ? `https:${uri}` : uri);

const createImageUrl = (uri) =>
  uri.split('-').length === 5
    ? `${ROCK.IMAGE_URL}?guid=${uri}`
    : enforceProtocol(uri);

export default {
  Query: {
    group: (root, { id }, { dataSources }) =>
      !id ? false : dataSources.Group.getFromId(id),
    groups: (root, {}, { dataSources }) => dataSources.Group.getGroups(),
  },
  Mutation: {},
  Group: {
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(id, parentType.name),
    /**
     * If Group doesn't have a ParentGroupId, Rock returns { }, not null
     */
    parentGroupId: ({ parentGroupId }) => parentGroupId,

    image: ({ attributeValues, attributes }) => ({
      __typename: 'ImageMedia',
      key: 'image',
      name: attributes.image ? attributes.image.name : '',
      sources: attributeValues.image
        ? [{ uri: createImageUrl(attributeValues.image.value) }]
        : [],
    }),

    childGroups: ({ id }, args, { dataSources }) =>
      typeof id === null ? [] : dataSources.Group.getChildrenFromParentId(id),
  },
};
