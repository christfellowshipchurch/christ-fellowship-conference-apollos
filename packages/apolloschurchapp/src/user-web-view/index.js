// Provider API for WebBrowser that injects theme values and defaults to the web browser:
// import { Platform } from 'react-native';
// import Url from 'url';
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { styled } from '@apollosproject/ui-kit';
import { WebView } from 'react-native-webview';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import BackgroundView from '../ui/BackgroundView';

const Container = styled({
  flex: null,
  width: '100%',
  height: '100%',
  borderRadius: 0,
})(BackgroundView);

const Browser = ({ url, cookie = '', modal, webViewStyle, ...props }) => {
  const URL = require('url');
  const _url = URL.parse(url);
  const now = new Date();
  const uri = `${_url.protocol}//${_url.host}${_url.pathname}?${_url.query ||
    ''}&timestamp=${now.getMilliseconds()}`;

  console.log('URI: ', uri);

  if (modal) {
    return (
      <Container>
        <WebView
          style={webViewStyle}
          source={{ uri, headers: { Cookie: cookie } }}
          {...props}
        />
      </Container>
    );
  }
  return (
    <WebView
      style={webViewStyle}
      source={{ uri, headers: { Cookie: cookie } }}
      {...props}
    />
  );
};

Browser.propTypes = {
  url: PropTypes.string.isRequired,
  cookie: PropTypes.string,
  webViewStyle: PropTypes.any,
  modal: PropTypes.bool.isRequired,
};

const WITH_USER_COOKIE = gql`
  query currentUserCookie {
    currentUser {
      id
      rockToken
    }
  }
`;

const BrowserWithUserCookie = ({
  url,
  navigation,
  modal = true,
  webViewStyle,
  ...props
}) => {
  // get the url from the navigation param or default to the url prop;
  const uri = navigation.getParam('url', url);
  return (
    <Query query={WITH_USER_COOKIE} fetchPolicy="cache-and-network">
      {({ data, loading }) => {
        if (loading) {
          return null;
        }
        const cookie = get(data, 'currentUser.rockToken', '');
        return (
          <Browser
            cookie={cookie}
            url={uri}
            modal={modal}
            webViewStyle={webViewStyle}
            {...props}
          />
        );
      }}
    </Query>
  );
};

BrowserWithUserCookie.propTypes = {
  url: PropTypes.string,
  modal: PropTypes.bool,
  webViewStyle: PropTypes.any,
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

export default withNavigation(BrowserWithUserCookie);
export { UserWebBrowserProvider, UserWebBrowserConsumer } from './Provider';
