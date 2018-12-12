import { ContentItem } from '@apollosproject/data-connector-rock-content';

export const { schema, dataSource } = ContentItem;

export const resolver = {
    ...ContentItem.resolver,
    ContentItem: {
        ...ContentItem.resolver.ContentItem,
        __resolveType: async (attrs, ...otherProps) => {
            console.log("Attributes: ",
                Object.hasOwnProperty.call(attrs.attributeValues, 'price'));

            if (Object.hasOwnProperty.call(attrs.attributeValues, 'price')) {
                console.log("Found Event Ticket");
                return 'EventTicketContentItem';
            }
            return ContentItem.resolver.ContentItem.__resolveType(
                attrs,
                ...otherProps
            );
        },
    },
};