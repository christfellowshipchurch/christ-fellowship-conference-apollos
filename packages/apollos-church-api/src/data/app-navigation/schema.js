import { gql } from 'apollo-server';

export default gql`
  type AppNavigationContentItem implements Node & ContentItem
    @cacheControl(maxAge: 600) {
    id: ID!
    title: String
    coverImage: ImageMedia
    images: [ImageMedia]
    videos: [VideoMedia]
    audios: [AudioMedia]
    htmlContent: String
    summary: String
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
    likedCount: Int

    startDateTime: String

    itemContentChannel: ContentChannel
    itemGroup: ConferenceGroupContentItem
    color: String
    icon: String
  }

  extend type Query {
    getMobileNavigationChannel: [AppNavigationContentItem]
  }
`;
