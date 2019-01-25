import React from 'react';
import { View, Text, Platform } from 'react-native';
import { WebBrowserConsumer } from 'apolloschurchapp/src/ui/WebBrowser';
import { OpenUserWebView } from 'apolloschurchapp/src/user-web-view/Provider';
import PropTypes from 'prop-types';
import { Touchable, styled } from '@apollosproject/ui-kit';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

const CallToActionTitle = styled(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.primary,
  textTransform: 'lowercase',
}))(Text);

const CallToActionView = styled(({ theme }) => ({
  width: '60%',
  alignSelf: 'center',

  marginTop: 10,

  paddingTop: 15,
  paddingBottom: 15,

  backgroundColor: 'white',
  borderRadius: 20,

  ...Platform.select(theme.shadows.default),
}))(View);

const CalloutText = styled(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.lightSecondary,
}))(Text);

const CallToAction = ({ icon, title, url, useCookie, callout }) => (
  <WebBrowserConsumer>
    {(openUrl) => (
      <Touchable
        onPress={() => (useCookie ? OpenUserWebView(url) : openUrl(url))}
      >
        <View>
          <CalloutText>{callout}</CalloutText>
          <CallToActionView>
            <CallToActionTitle>
              <FontAwesome5 name={icon} size={28} />
              {'\n'}
              {title}
            </CallToActionTitle>
          </CallToActionView>
        </View>
      </Touchable>
    )}
  </WebBrowserConsumer>
);

CallToAction.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  useCookie: PropTypes.bool,
  callout: PropTypes.string,
};

export default CallToAction;
