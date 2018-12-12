import { ContentItem } from '@apollosproject/data-connector-rock-content';

export const { schema, dataSource } = ContentItem;

export const resolver = {
    ...ContentItem.resolver,
    ContentItem: {
        ...ContentItem.resolver.ContentItem,
        __resolveType: async (attrs, ...otherProps) => {
            console.log("Has Price: ",
                Object.hasOwnProperty.call(attrs.attributeValues, 'price'));

            if (Object.hasOwnProperty.call(attrs.attributeValues, 'price')) {
                return 'EventTicketContentItem';
            }
            return ContentItem.resolver.ContentItem.__resolveType(
                attrs,
                ...otherProps
            );
        },
    },
};