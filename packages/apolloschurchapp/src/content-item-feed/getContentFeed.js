import gql from 'graphql-tag';

import { largeCardFragment } from 'apolloschurchapp/src/ui/ContentCardConnected';
import { contentItemFragment } from '../content-single/getContentItem';

export default gql`
  query getContentItemFeed($itemId: ID!) {
    node(id: $itemId) {
      id
      ... on ContentItem {
        title
        childContentItemsConnection {
          edges {
            node {
              ...contentItemFragment
              ...largeCardFragment
              ... on ConferenceScheduleContentItem {
                conferenceGroups {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;
