import gql from 'graphql-tag';

export default gql`
  query {
    currentUser {
      id
      profile {
        id
        firstName
        lastName
        email
        nickName
        church
        jobTitle
        photo {
          uri
        }
      }
    }
  }
`;
