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
    itemGroup: ({ attributeValues }, args, { dataSources }) =>
      attributeValues.itemGroup.value
        ? dataSources.Group.getFromGuid(attributeValues.itemGroup.value)
        : null,
    color: ({ attributeValues }) => attributeValues.color.value,
    icon: ({ attributeValues }) => attributeValues.icon.value,
  },
  Query: {
    getMobileNavigationChannel: (root, args, context) =>
      context.dataSources.AppNavigationContentItem.getMobileNavigationChannel(),
  },
};
