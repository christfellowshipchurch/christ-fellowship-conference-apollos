import { ContentItem } from '@apollosproject/data-connector-rock';

export default {
  ...ContentItem.resolver,
  EventTicketContentItem: {
    startDateTime: ({ startDateTime }) => startDateTime,

    ticketPrice: ({ attributeValues }) => attributeValues.price.value,
    registration: ({ attributeValues }) => attributeValues.registration.value,
    color: ({ attributeValues }) => attributeValues.color.value,
  },
};
