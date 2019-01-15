import { ContentItem } from '@apollosproject/data-connector-rock';

export default {
  ConferenceGroupContentItem: {
    ...ContentItem.resolver.UniversalContentItem,
    title: ({ name }) => name,
    htmlContent: ({ description }) => description,
    childGroups: ({ id }, args, { dataSources }) =>
      dataSources.Group.getChildrenFromParentId(id),
    parentChannel: () => null,
  },
};
