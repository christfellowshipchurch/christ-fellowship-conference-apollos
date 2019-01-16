import gql from 'graphql-tag';

export default gql`
  mutation registerPersonWithFullName(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    registerPersonWithFullName(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
    }
  }
`;
