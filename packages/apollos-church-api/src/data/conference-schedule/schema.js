import { gql } from 'apollo-server';

export default gql`
  type ConferenceScheduleContentItem implements Node & ContentItem {
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

    headerColor: Color
    customItem: String
  }
`;
