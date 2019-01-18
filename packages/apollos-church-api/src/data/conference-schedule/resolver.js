import { ContentItem } from '@apollosproject/data-connector-rock';
import { get } from 'lodash';

export default {
  ConferenceScheduleContentItem: {
    ...ContentItem.resolver.UniversalContentItem,

    customItem: ({ attributeValues }) => attributeValues.customItem.value,
    theme: ({ attributeValues }) => ({
      type: 'LIGHT',
      colors: {
        primary: get(
          attributeValues,
          'color.value',
          'rgba(165, 165, 165, 0.30000000000000004)'
        ),
        secondary: '#17B582',
        tertiary: '#6EC5B8',
        screen: '#F8F7F4',
        paper: '#FFFFFF',
        alert: '#c64f55',
      },
    }),
  },
};
