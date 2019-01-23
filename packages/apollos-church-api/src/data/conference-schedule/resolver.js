import { ContentItem } from '@apollosproject/data-connector-rock';
import { get } from 'lodash';

export default {
  ConferenceScheduleContentItem: {
    ...ContentItem.resolver.UniversalContentItem,

    customItem: ({ attributeValues }) => attributeValues.customItem.value,
    itemStartTime: ({ title, attributeValues }, args, { dataSources }) => {
      console.log(`${title} : ${attributeValues}`);
      return dataSources.ConferenceScheduleContentItem.getTime(
        get(
          attributeValues,
          'itemStartDateTime.value',
          new Date().toString()
        ) || new Date().toString()
      );
    },
    theme: ({ attributeValues }) => ({
      type: 'DARK',
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
  },
};
