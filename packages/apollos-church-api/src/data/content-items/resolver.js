import { ContentItem } from '@apollosproject/data-connector-rock';

export default {
  ...ContentItem.resolver,
  ContentItem: {
    ...ContentItem.resolver.ContentItem,
    __resolveType: async (attrs, ...otherProps) => {
      // console.log(attrs.attributeValues);

      if (Object.hasOwnProperty.call(attrs.attributeValues, 'price')) {
        return 'EventTicketContentItem';
      }

      if (Object.hasOwnProperty.call(attrs.attributeValues, 'person')) {
        return 'ConferenceSpeakerContentItem';
      }

      if (
        Object.hasOwnProperty.call(attrs.attributeValues, 'itemContentChannel')
      ) {
        return 'AppNavigationContentItem';
      }

      if (Object.hasOwnProperty.call(attrs, 'groupTypeId')) {
        return 'ConferenceGroupContentItem';
      }

      return ContentItem.resolver.ContentItem.__resolveType(
        attrs,
        ...otherProps
      );
    },
  },
  SharableContentItem: {
    url: ({ url = null }) => url,
    // todo: return a dynamic url that links to the content item
    title: ({ title = null }) => title,
    message: ({ message = null }) => message,
  },
};
