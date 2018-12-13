import { ContentItem } from '@apollosproject/data-connector-rock-content';

export const resolver = {
    ...ContentItem.resolver,
    EventTicketContentItem: {
        startDateTime: ({ startDateTime, attributeValues }) => {
            return startDateTime
        },

        ticketPrice: ({ attributeValues }) => attributeValues.price.value,
        registration: ({ attributeValues }) => attributeValues.registration.value,
        color: ({ attributeValues }) => attributeValues.color.value,
    }
};