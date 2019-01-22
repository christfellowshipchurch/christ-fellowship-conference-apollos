/* eslint-disable camelcase */
import gql from 'graphql-tag';

export default gql`
  enum UPDATEABLE_PROFILE_FIELDS {
    FirstName
    LastName
    Email
    NickName

    Church
    MinistryDepartment
    JobTitle
  }

  input UpdateProfileInput {
    field: UPDATEABLE_PROFILE_FIELDS!
    value: String!
  }

  type Person implements Node @cacheControl(maxAge: 0) {
    id: ID!
    firstName: String!
    lastName: String!
    nickName: String
    email: String
    photo: ImageMediaSource

    bio: String!
    church: String!
    jobTitle: String!
    department: String!
    facebook: String!
    instagram: String!
    twitter: String!
  }

  extend type Mutation {
    updateProfileField(input: UpdateProfileInput!): Person
    updateProfileFields(
      input: [UpdateProfileInput]!
      attributeValues: [UpdateProfileInput]!
    ): Person
    uploadProfileImage(file: Upload!, size: Int!): Person
  }

  extend type Query {
    people(email: String!): [Person]
    alias(alias: String!): [Person]
  }
`;
