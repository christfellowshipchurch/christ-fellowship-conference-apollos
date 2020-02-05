import gql from 'graphql-tag';

export const contentItemFragment = gql`
  fragment contentItemFragment on ContentItem {
    id
    title
    isLiked
    likedCount
    summary
    coverImage {
      name
      sources {
        uri
      }
    }
    theme {
      type
      colors {
        primary
        secondary
        screen
        paper
      }
    }
    parentChannel {
      id
      name
    }
    videos {
      sources {
        uri
      }
    }
    audios {
      sources {
        uri
      }
    }
  }
`;

export const breakoutFragment = gql`
  fragment breakoutFragment on Breakout {
    id
    title
    summary
    location
    htmlContent
    icon
    theme {
      colors {
        primary
      }
    }
    categories {
      id
      value
    }
    times {
      id
      value
    }
  }
`;

export default gql`
  query getContentItem($itemId: ID!) {
    node(id: $itemId) {
      __typename
      ... on ContentItem {
        ...contentItemFragment
      }

      ... on Breakout {
        ...breakoutFragment
      }
    }
  }
  ${contentItemFragment}
  ${breakoutFragment}
`;
