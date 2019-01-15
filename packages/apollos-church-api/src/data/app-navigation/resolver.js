import { ContentItem } from '@apollosproject/data-connector-rock';

export default {
  AppNavigationContentItem: {
    ...ContentItem.resolver.UniversalContentItem,

    itemContentChannel: ({ attributeValues }, args, { dataSources }) =>
      attributeValues.itemContentChannel.value
        ? dataSources.ContentChannel.getFromGuid(
            attributeValues.itemContentChannel.value
          )
        : null,
    itemGroup: ({ attributeValues }) =>
      // TODO : Update this to query the group based on the ID

      ({}),
    color: ({ attributeValues }) => attributeValues.color.value,
    icon: ({ attributeValues }) => attributeValues.icon.value,
  },
  Query: {
    getMobileNavigationChannel: (root, args, context) =>
      context.dataSources.AppNavigationContentItem.getMobileNavigationChannel(),
  },
};
