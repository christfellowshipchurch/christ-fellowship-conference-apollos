// Provider API for WebBrowser that injects theme values and defaults to the web browser:
// import { Platform } from 'react-native';
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { BackgroundView, styled } from '@apollosproject/ui-kit';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const Container = styled({
  flex: null,
  width: '100%',
  height: '100%',
  borderRadius: 0,
})(BackgroundView);

const Browser = ({ url, cookie = '' }) => (
  <Container>
    <WebView source={{ uri: url, headers: { Cookie: cookie } }} />
  </Container>
);

Browser.propTypes = {
  url: PropTypes.string.isRequired,
  cookie: PropTypes.string,
};

const WITH_USER_COOKIE = gql`
  query currentUserCookie {
    currentUser {
      id
      rockToken
    }
  }
`;

const BrowserWithUserCookie = ({ url, navigation }) => {
  // get the url from the navigation param or default to the url prop;
  const uri = navigation.getParam('url', url);
  return (
    <Query query={WITH_USER_COOKIE}>
      {({ data, loading }) => {
        if (loading) {
          return null;
        }
        const cookie = get(data, 'currentUser.rockToken', '');
        return <Browser cookie={cookie} url={uri} />;
      }}
    </Query>
  );
};

BrowserWithUserCookie.propTypes = {
  url: PropTypes.string,
};

export default BrowserWithUserCookie;
export { UserWebBrowserProvider, UserWebBrowserConsumer } from './Provider';
