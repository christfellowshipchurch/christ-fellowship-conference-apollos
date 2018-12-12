import { ContentItem } from '@apollosproject/data-connector-rock-content';

export const { schema, dataSource } = ContentItem;

export const resolver = {
    ...ContentItem.resolver,
    ContentItem: {
        ...ContentItem.resolver.ContentItem,
        __resolveType: async (attrs, ...otherProps) => {

            if (Object.hasOwnProperty.call(attrs.attributeValues, 'price')) {
                console.log("Found Ticket");
                return 'EventTicketContentItem';
            }
            return ContentItem.resolver.ContentItem.__resolveType(
                attrs,
                ...otherProps
            );
        },
    },
    SharableContentItem: {
        url: ({ url = null }) => url,
        // todo: return a dynamic url that links to the content item
        title: ({ title = null }) => title,
        message: ({ message = null }) => message,
    },
};