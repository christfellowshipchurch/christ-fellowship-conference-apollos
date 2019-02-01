import gql from 'graphql-tag';

export default gql`
  query {
    currentUser {
      id
      profile {
        id
        activeFeatures
      }
    }
  }
`;
