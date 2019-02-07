import { Person } from '@apollosproject/data-connector-rock';
import moment from 'moment';

const availableFeatures = [
  {
    key: 'my-breakouts',
    startTime: null,
    endTime: null,
    order: 1,
  },
  {
    key: 'qr-code',
    startTime: '2019-02-07 07:30:00-05:00',
    endTime: '2019-02-07 11:00:00-05:00',
    order: 2,
  },
  {
    key: 'survey',
    startTime: '2019-02-07 20:00:00-05:00',
    endTime: '2019-02-10 12:00:00-05:00',
    order: 0,
  },
];

const nowIsBetweenTimes = (start, end) => {
  const mStart = moment.utc(start);
  const mEnd = moment.utc(end);
  const now = moment.utc();

  const afterStart = now.isSameOrAfter(mStart) || !start;
  const beforeEnd = now.isSameOrBefore(mEnd) || !end;

  return afterStart && beforeEnd;
};

const selectAvailableFeatures = () => {
  const active = availableFeatures
    .filter((n) => nowIsBetweenTimes(n.startTime, n.endTime))
    .sort((a, b) => a.order - b.order);

  return active.map((n) => n.key);
};

export default {
  ...Person.resolver,
  Mutation: {
    ...Person.resolver.Mutation,
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
    activeFeatures: () => selectAvailableFeatures(),
  },
};
