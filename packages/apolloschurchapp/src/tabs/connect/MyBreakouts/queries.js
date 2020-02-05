import gql from 'graphql-tag';

export const MY_BREAKOUTS = gql`
  query myBreakouts {
    myBreakouts {
      id
      title
      description
      icon
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
  }
`;

export const BREAKOUTS_SIGN_UP_URL = gql`
  query breakoutSignUpUrl {
    breakoutSignUpUrl
  }
`;
