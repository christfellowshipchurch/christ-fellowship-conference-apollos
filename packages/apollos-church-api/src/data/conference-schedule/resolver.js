import { ContentItem } from '@apollosproject/data-connector-rock';

export default {
  ConferenceScheduleContentItem: {
    ...ContentItem.resolver.UniversalContentItem,

    customItem: ({ attributeValues }) => attributeValues.customItem.value,
  },
};
