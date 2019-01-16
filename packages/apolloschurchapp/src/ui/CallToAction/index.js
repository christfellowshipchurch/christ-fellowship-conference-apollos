import React from 'react';
import { View, Text, Platform } from 'react-native';
import { WebBrowserConsumer } from 'apolloschurchapp/src/ui/WebBrowser';
import { OpenUserWebView } from 'apolloschurchapp/src/user-web-view/Provider';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import {
  H2,
  Touchable,
  withTheme,
  TableView,
  Cell,
  CellIcon,
  CellText,
  Divider,
  styled,
  PaddedView,
  H4,
} from '@apollosproject/ui-kit';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

const viewStyle = {
  width: '60%',
  alignSelf: 'center',

  marginTop: 10,
  marginBottom: 10,
  paddingTop: '5%',
  paddingBottom: '5%',

  backgroundColor: 'white',
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#eee',
};

const CallToActionTitle = styled(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.primary,
  textTransform: 'lowercase',
}))(Text);

const CallToActionView = styled(({ theme }) => ({
  width: '60%',
  alignSelf: 'center',

  marginTop: 10,
  marginBottom: 10,
  paddingTop: '5%',
  paddingBottom: '5%',

  backgroundColor: 'white',
  borderRadius: 20,

  ...Platform.select(theme.shadows.default),
}))(View);

const CallToAction = ({ icon, title, url, useCookie }) => (
  <WebBrowserConsumer>
    {(openUrl) => (
      <Touchable
        onPress={() => (useCookie ? OpenUserWebView(url) : openUrl(url))}
      >
        <CallToActionView>
          <CallToActionTitle>
            <FontAwesome5 name={icon} size={30} />
            {'\n'}
            {title}
          </CallToActionTitle>
        </CallToActionView>
      </Touchable>
    )}
  </WebBrowserConsumer>
);

CallToAction.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  useCookie: PropTypes.bool,
};

export default CallToAction;
