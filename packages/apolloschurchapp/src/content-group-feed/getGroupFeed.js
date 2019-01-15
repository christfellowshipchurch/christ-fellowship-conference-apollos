import gql from 'graphql-tag';

import { largeCardFragment } from 'apolloschurchapp/src/ui/ContentCardConnected';
import { contentItemFragment } from '../content-single/getContentItem';

export default gql`
  query getGroupFeed($itemId: ID!) {
    node(id: $itemId) {
      ... on ConferenceGroupContentItem {
        childGroups {
          ...contentItemFragment
          ...largeCardFragment
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;
