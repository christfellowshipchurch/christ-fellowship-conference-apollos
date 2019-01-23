import { ContentItem } from '@apollosproject/data-connector-rock';
import { get } from 'lodash';
import sanitizeHtmlNode from 'sanitize-html';

const titleWithValue = (title, value) =>
  title && value ? `<strong>${title}:</strong> ${value}` : null;

const concatWithBreakLine = (args) => {
  let content = '';

  args.forEach((n, i) => {
    if (n) {
      const newContent = content.concat(`${n}\n`);
      content = newContent;
    }
  });

  return content;
};

const getBreakoutDetails = (attributeValues) => {
  const room = get(attributeValues, 'room.value');
  const facilitator = get(attributeValues, 'facilitator.value');
  const breakouts = get(attributeValues, 'breakOut.value');

  const desc = concatWithBreakLine([
    titleWithValue('Room', room),
    titleWithValue('Facilitator', facilitator),
    titleWithValue('Breakout', breakouts),
  ]);

  return desc;
};

export default {
  ConferenceGroupContentItem: {
    ...ContentItem.resolver.UniversalContentItem,
    title: ({ name }) => name,
    htmlContent: ({ description, attributeValues }) =>
      sanitizeHtmlNode(
        `${getBreakoutDetails(attributeValues)}<hr>${description}`
      ),
    summary: ({ description, attributeValues }) =>
      sanitizeHtmlNode(getBreakoutDetails(attributeValues)),
    childGroups: ({ id }, args, { dataSources }) =>
      dataSources.Group.getChildrenFromParentId(id),
    parentChannel: () => null,
  },
};
