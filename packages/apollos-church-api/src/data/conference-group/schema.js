/* eslint-disable camelcase */
import gql from 'graphql-tag';

export default gql`
  type ConferenceGroupContentItem implements ContentItem & Node {
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

    theme: Theme
    childGroups: [ConferenceGroupContentItem]
  }
`;
