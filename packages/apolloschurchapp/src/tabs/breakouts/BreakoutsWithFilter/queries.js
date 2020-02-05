import gql from 'graphql-tag';
import { breakoutFragment } from '../../../content-single/getContentItem';

export const GET_BREAKOUT_FILTERS = gql`
  query breakoutFilters($filter: BREAKOUT_FILTER!) {
    breakoutFilters(filter: $filter) {
      id
      value
      icon
      theme {
        colors {
          primary
        }
      }
    }
  }
`;

export const BREAKOUTS_BY_FILTERS = gql`
  query breakouts($category: String, $time: String) {
    breakouts(category: $category, time: $time) {
      ...breakoutFragment
    }
  }
  ${breakoutFragment}
`;
