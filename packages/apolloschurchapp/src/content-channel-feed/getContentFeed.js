import gql from 'graphql-tag';

import { largeCardFragment } from 'apolloschurchapp/src/ui/ContentCardConnected';
import { contentItemFragment } from '../content-single/getContentItem';

export default gql`
  query getContentFeed($itemId: ID!) {
    node(id: $itemId) {
      ... on ContentChannel {
        childContentItemsConnection {
          edges {
            node {
              ...contentItemFragment
              ...largeCardFragment
              childContentItemsConnection {
                edges {
                  node {
                    id
                  }
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
