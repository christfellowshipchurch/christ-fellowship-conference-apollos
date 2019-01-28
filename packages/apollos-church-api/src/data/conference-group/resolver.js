import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';
import { get } from 'lodash';
import sanitizeHtmlNode from 'sanitize-html';

const { ROCK_CONSTANTS, ROCK_MAPPINGS, ROCK } = ApollosConfig;

const enforceProtocol = (uri) => (uri.startsWith('//') ? `https:${uri}` : uri);
const createImageUrl = (uri) =>
  uri.split('-').length === 5
    ? `${ROCK.IMAGE_URL}?guid=${uri}`
    : enforceProtocol(uri);

const isImage = ({ key, attributeValues, attributes }) =>
  attributes[key].fieldTypeId === ROCK_CONSTANTS.IMAGE ||
  (key.toLowerCase().includes('image') &&
    typeof attributeValues[key].value === 'string' &&
    attributeValues[key].value.startsWith('http')); // looks like an image url

const titleWithValue = (title, value) =>
  title && value ? `${title}: ${value}` : null;

const concatWithBreakLine = (args, lineBreak, isTag = false) => {
  let content = '';

  args.forEach((n, i) => {
    if (n) {
      const newContent = isTag
        ? content.concat(`<${lineBreak}>${n}</${lineBreak}>`)
        : content.concat(`${n}${lineBreak}`);
      content = newContent;
    }
  });

  return content;
};

const getBreakoutDetails = (attributeValues, lineBreak) => {
  const room = get(attributeValues, 'room.value');
  const facilitator = get(attributeValues, 'facilitator.value');
  const breakouts = get(attributeValues, 'breakOut.value');

  const desc = concatWithBreakLine(
    [
      titleWithValue('Room', room),
      titleWithValue('Facilitator', facilitator),
      titleWithValue('Breakout', breakouts),
    ],
    lineBreak
  );

  return desc;
};

export default {
  ConferenceGroupContentItem: {
    ...ContentItem.resolver.UniversalContentItem,
    title: ({ name }) => name,
    htmlContent: ({ description, attributeValues }) =>
      sanitizeHtmlNode(
        `${getBreakoutDetails(attributeValues, 'p', true)}<hr>${description}`
      ),
    summary: ({ description, attributeValues }) =>
      sanitizeHtmlNode(getBreakoutDetails(attributeValues, '\n')),
    childGroups: ({ id }, args, { dataSources }) =>
      dataSources.Group.getChildrenFromParentId(id),
    parentChannel: () => null,
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
      if (defaultImages.length) {
        return pickBestImage(defaultImages);
      }

      // If no image, check parent for image:

      if (root.parentGroupId) {
        const parentGroup = await dataSources.Group.getFromId(
          root.parentGroupId
        );

        if (parentGroup.attributes.image) {
          return {
            __typename: 'ImageMedia',
            key: 'image',
            name: parentGroup.attributes.image
              ? parentGroup.attributes.image.name
              : '',
            sources: parentGroup.attributeValues.image
              ? [
                  {
                    uri: createImageUrl(
                      parentGroup.attributeValues.image.value
                    ),
                  },
                ]
              : [],
          };
        }
      }

      return null;
    },
  },
};
