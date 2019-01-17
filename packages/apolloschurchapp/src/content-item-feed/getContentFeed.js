import gql from 'graphql-tag';

import { largeCardFragment } from 'apolloschurchapp/src/ui/ContentCardConnected';
import { contentItemFragment } from '../content-single/getContentItem';

export default gql`
  query getContentItemFeed($itemId: ID!) {
    node(id: $itemId) {
      id
      ... on ContentItem {
        childContentItemsConnection {
          edges {
            node {
              ...contentItemFragment
              ...largeCardFragment
            }
          }
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;
