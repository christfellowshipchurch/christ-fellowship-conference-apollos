import { Person } from '@apollosproject/data-connector-rock';

export default {
  ...Person.resolver,
  Mutation: {
    updateProfileFields: (root, { input, attributeValues }, { dataSources }) =>
      dataSources.Person.updateProfile(input, attributeValues),
  },
  Person: {
    ...Person.resolver.Person,
    bio: ({ attributeValues }) =>
      typeof attributeValues.bio === 'object' ? attributeValues.bio.value : '',
    church: ({ attributeValues }) =>
      typeof attributeValues.church === 'object'
        ? attributeValues.church.value
        : '',
    jobTitle: ({ attributeValues }) =>
      typeof attributeValues.jobTitle === 'object'
        ? attributeValues.jobTitle.value
        : '',
    department: ({ attributeValues }) =>
      typeof attributeValues.ministryDepartment === 'object'
        ? attributeValues.ministryDepartment.value
        : '',
    facebook: ({ attributeValues }) =>
      typeof attributeValues.facebook === 'object'
        ? attributeValues.facebook.value
        : '',
    twitter: ({ attributeValues }) =>
      typeof attributeValues.twitter === 'object'
        ? attributeValues.twitter.value
        : '',
    instagram: ({ attributeValues }) =>
      typeof attributeValues.instagram === 'object'
        ? attributeValues.instagram.value
        : '',
  },
};
