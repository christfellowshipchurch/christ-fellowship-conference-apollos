import gql from 'graphql-tag';

export default gql`
  query getMobileAppNavigation {
    getMobileNavigationChannel {
      ... on AppNavigationContentItem {
        id
        title

        icon
        color

        itemContentChannel {
          ... on ContentChannel {
            id
            name

            childContentItemsConnection {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;
