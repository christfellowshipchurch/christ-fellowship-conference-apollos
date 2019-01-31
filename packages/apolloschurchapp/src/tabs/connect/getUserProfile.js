import gql from 'graphql-tag';

export default gql`
  query {
    currentUser {
      id
      rockGuid
      profile {
        id
        firstName
        lastName
        email
        nickName
        church
        department
        jobTitle
        activeFeatures
        photo {
          uri
        }
      }
    }
  }
`;
