import { ContentItem } from '@apollosproject/data-connector-rock';
import { get } from 'lodash';

const replaceEmptyString = (str, value) => (str || str === '' ? value : str);
const getAttributeValue = (obj, attr, fallback) =>
  replaceEmptyString(get(obj, `attributeValues.${attr}.value`, '6'), fallback);

export default {
  ConferenceScheduleContentItem: {
    ...ContentItem.resolver.UniversalContentItem,

    htmlContent: ({ content, attributeValues }, args, { dataSources }) => {
      const startTime = dataSources.ConferenceScheduleContentItem.getTime(
        get(
          attributeValues,
          'itemStartDateTime.value',
          new Date().toString()
        ) || null
      );

      const endTime = dataSources.ConferenceScheduleContentItem.getTime(
        get(attributeValues, 'itemEndDateTime.value') || null
      );

      const timeRange =
        startTime + (endTime !== 'Invalid date' ? ` - ${endTime}` : '');

      return dataSources.ConferenceScheduleContentItem.extendAndSanitizeHtmlContent(
        content,
        [timeRange]
      );
    },
    summary: ({ attributeValues }, args, { dataSources }) => {
      const startTime = dataSources.ConferenceScheduleContentItem.getTime(
        get(
          attributeValues,
          'itemStartDateTime.value',
          new Date().toString()
        ) || null
      );

      const endTime = dataSources.ConferenceScheduleContentItem.getTime(
        get(attributeValues, 'itemEndDateTime.value') || null
      );

      const timeRange =
        startTime + (endTime !== 'Invalid date' ? ` - ${endTime}` : '');

      const subtitle = get(attributeValues, 'subtitle.value')
        ? `\n${get(attributeValues, 'subtitle.value')}`
        : '';
      return timeRange + subtitle;
    },
    customItem: ({ attributeValues }) => attributeValues.customItem.value,
    itemStartTime: ({ title, attributeValues }, args, { dataSources }) =>
      dataSources.ConferenceScheduleContentItem.getTime(
        get(
          attributeValues,
          'itemStartDateTime.value',
          new Date().toString()
        ) || new Date().toString()
      ),
    theme: ({ attributeValues }) => ({
      type: 'LIGHT',
      colors: {
        primary:
          get(
            attributeValues,
            'color.value',
            'rgba(165, 165, 165, 0.30000000000000004)'
          ) || 'rgba(165, 165, 165, 0.30000000000000004)',
        secondary: '#17B582',
        tertiary: '#6EC5B8',
        screen: '#F8F7F4',
        paper: '#FFFFFF',
        alert: '#c64f55',
      },
    }),
    coverImage: async (root, args, { dataSources }) => {
      const pickBestImage = (images) => {
        // TODO: there's probably a _much_ more explicit and better way to handle this
        const squareImage = images.find((image) =>
          image.key.toLowerCase().includes('square')
        );
        if (squareImage) return { ...squareImage, __typename: 'ImageMedia' };
        return { ...images[0], __typename: 'ImageMedia' };
      };

      let defaultImages = ContentItem.resolver.ContentItem.images(root) || [];
      defaultImages = defaultImages.filter((image) => image.sources.length); // filter images w/o URLs
      if (defaultImages.length) return pickBestImage(defaultImages);

      // If no image, check parent for image:

      return null;
    },
    conferenceGroups: async ({ attributeValues }, args, { dataSources }) => {
      const groups = await dataSources.ConferenceScheduleContentItem.getScheduleItemGroupsByBreakoutSession(
        get(attributeValues, 'breakoutSession.value') || ''
      );

      return groups.sort(
        dataSources.ConferenceGroupContentItem.sortByBreakoutThenPriority
      );
    },
  },
};
