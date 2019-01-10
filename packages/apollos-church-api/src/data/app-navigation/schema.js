import { gql } from 'apollo-server';

export default gql`
  type AppNavigationContentItem implements Node & ContentItem {
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
    group: Group
    color: String
    icon: String
  }

  extend type Query {
    getMobileNavigationChannel: [AppNavigationContentItem]
  }
`;
