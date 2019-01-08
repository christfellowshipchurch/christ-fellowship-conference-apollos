import { ContentItem } from '@apollosproject/data-connector-rock';

export default {
  EventTicketContentItem: {
    ...ContentItem.resolver.UniversalContentItem,

    ItemContentChannel: ({ attributeValues }) => 
      // TODO : Update this to query the content channel based on ID

       ({})
    ,
    group: ({ attributeValues }) => 
      // TODO : Update this to query the group based on the ID

       ({})
    ,
    color: ({ attributeValues }) => attributeValues.color.value,
    icon: ({ attributeValues }) => attributeValues.icon.value,
  },
};
