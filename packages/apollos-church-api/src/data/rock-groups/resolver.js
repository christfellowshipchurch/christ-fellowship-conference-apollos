import ApollosConfig from '@apollosproject/config';
import { createGlobalId } from '@apollosproject/server-core';
import { get, isEmpty } from 'lodash';

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
    groups: (root, { }, { dataSources }) => dataSources.Group.getGroups(),
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
    slideshowPresentation: ({ attributes, attributeValues }) => {
      const value = get(attributeValues, 'slideshowPresentation.value', null);

      return value && !isEmpty(value, false)
        ? `https://my.christfellowshipconference.com/GetFile.ashx?guid=${value}`
        : null;
    },
    audioRecording: ({ attributeValues }) => {
      const value = get(attributeValues, 'breakoutAudio.value', null);

      return value && !isEmpty(value, false)
        ? `https://my.christfellowshipconference.com/GetFile.ashx?guid=${value}`
        : null;
    },
    additionalResources: ({ attributeValues }) =>
      get(attributeValues, 'additionalResources.value', null),
  },
};
