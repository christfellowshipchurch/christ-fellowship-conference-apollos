/* eslint-disable camelcase */
import gql from 'graphql-tag';

export default schema = gql`
    type EventTicketContentItem implements Node & ContentItem {
        id: ID!
        title: String
        coverImage: ImageMedia
        images: [ImageMedia]
        videos: [VideoMedia]
        audios: [AudioMedia]
        htmlContent: String
        childContentItemsConnection(
            first: Int
            after: String
        ): ContentItemsConnection
        siblingContentItemsConnection(
            first: Int
            after: String
        ): ContentItemsConnection
        parentChannel: ContentChannel

        sharing: SharableContentItem
        theme: Theme
        isLiked: Boolean

        startDateTime: String

        ticketPrice: String
        registration: String
        color: String
    }
`;