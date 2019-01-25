import gql from 'graphql-tag';

import { largeCardFragment } from 'apolloschurchapp/src/ui/ContentCardConnected';
import { contentItemFragment } from '../content-single/getContentItem';

export default gql`
  query getContentBreakoutFeed($itemId: ID!) {
    node(id: $itemId) {
      id
      ... on ConferenceScheduleContentItem {
        title
        htmlContent
        conferenceGroups {
          ...contentItemFragment
          ...largeCardFragment
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;
