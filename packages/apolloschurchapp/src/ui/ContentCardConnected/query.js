import gql from 'graphql-tag';

export const coverImageFragment = gql`
  fragment coverImageFragment on ContentItem {
    coverImage {
      sources {
        uri
      }
    }
  }
`;

export const themeFragment = gql`
  fragment themeFragment on ContentItem {
    theme {
      type
      colors {
        primary
        secondary
        screen
        paper
      }
    }
  }
`;

export const contentCardMetricsFragment = gql`
  fragment contentCardMetricsFragment on ContentItem {
    isLiked
    likedCount
  }
`;

export const baseCardFragment = gql`
  fragment baseCardFragment on ContentItem {
    id
    __typename
    ...contentCardMetricsFragment
    ...coverImageFragment
    ...themeFragment
    title
    summary
  }
  ${contentCardMetricsFragment}
  ${coverImageFragment}
  ${themeFragment}
`;

export const tileCardFragment = gql`
  fragment tileCardFragment on ContentItem {
    ... on ContentSeriesContentItem {
      id
      ...themeFragment
      ...coverImageFragment
      ...contentCardMetricsFragment
    }
    ... on UniversalContentItem {
      ...baseCardFragment
    }
    ... on ConferenceGroupContentItem {
      ...baseCardFragment
    }
    ... on DevotionalContentItem {
      ...baseCardFragment
    }
    ... on MediaContentItem {
      ...baseCardFragment
    }
  }
  ${baseCardFragment}
  ${themeFragment}
  ${coverImageFragment}
  ${contentCardMetricsFragment}
`;

export const largeCardFragment = gql`
  fragment largeCardFragment on ContentItem {
    ...baseCardFragment
  }
  ${baseCardFragment}
`;

export const breakoutFragment = gql`
  fragment breakoutFragment on Breakout {
    title
    summary
    htmlContent
    icon
    categories {
      id
      value
    }
    times {
      id
      value
    }
    theme {
      colors {
        primary
      }
    }
  }

  fragment breakoutFilterFragment on BreakoutFilter {
    value
    icon
    theme {
      colors {
        primary
      }
    }
  }
`;

const getContentCard = gql`
  query getContentCard($contentId: ID!, $tile: Boolean!) {
    node(id: $contentId) {
      id
      __typename
      ...tileCardFragment @include(if: $tile)
      ...largeCardFragment @skip(if: $tile)
      ...breakoutFragment
      ...breakoutFilterFragment
    }
  }
  ${tileCardFragment}
  ${largeCardFragment}
  ${breakoutFragment}
`;

export default getContentCard;
