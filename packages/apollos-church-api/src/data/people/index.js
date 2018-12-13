import gql from 'graphql-tag';
import { Person } from '@apollosproject/data-connector-people';


export { default as dataSource } from './data-source';

// export { default as schema } from './schema';
// export { default as resolver } from './resolver';

export const schema = gql`
    enum UPDATEABLE_PROFILE_FIELDS {
        FirstName
        LastName
        Email
        NickName
    }

    input UpdateProfileInput {
        field: UPDATEABLE_PROFILE_FIELDS!
        value: String!
    }

    type Person implements Node {
        id: ID!
        firstName: String!
        lastName: String!
        nickName: String
        email: String
        photo: ImageMediaSource
        
        bio: String!
        jobTitle: String!
        facebook: String!
        instagram: String!
        twitter: String!

    }

    extend type Mutation {
        updateProfileField(input: UpdateProfileInput!): Person
        updateProfileFields(input: [UpdateProfileInput]!): Person
        uploadProfileImage(file: Upload!, size: Int!): Person
    }

    extend type Query {
        people(email: String!): [Person]
        alias(alias: String!):  [Person]
    }
`;


export const resolver = {
    Person: {
        ...Person.resolver.Person,
        bio: ({ attributeValues }) => (typeof attributeValues.bio === 'object' ? attributeValues.bio.value : ''),
        jobTitle: ({ attributeValues }) => (typeof attributeValues.jobTitle === 'object' ? attributeValues.jobTitle.value : ''),
        facebook: ({ attributeValues }) => (typeof attributeValues.facebook === 'object' ? attributeValues.facebook.value : ''),
        twitter: ({ attributeValues }) => (typeof attributeValues.twitter === 'object' ? attributeValues.twitter.value : ''),
        instagram: ({ attributeValues }) => (typeof attributeValues.instagram === 'object' ? attributeValues.instagram.value : ''),
    }
};