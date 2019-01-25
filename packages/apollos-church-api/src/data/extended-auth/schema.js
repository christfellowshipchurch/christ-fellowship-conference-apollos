import { authSchema } from '@apollosproject/data-schema';
import { gql } from 'apollo-server';

export default gql`
  ${authSchema}

  extend type Mutation {
    registerPersonWithFullName(
      firstName: String!
      lastName: String!
      church: String
      email: String!
      password: String!
    ): Authentication
  }
`;
