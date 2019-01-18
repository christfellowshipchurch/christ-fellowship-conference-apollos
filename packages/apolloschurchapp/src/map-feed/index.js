import React, { PureComponent } from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import SafeAreaView from 'react-native-safe-area-view';

import { createStackNavigator } from 'react-navigation';
import { BackgroundView, styled } from '@apollosproject/ui-kit';

import { WebView } from 'react-native-webview';
import UserWebView from '../user-web-view';

import headerOptions from '../tabs/headerOptions';

const InlineWebViewContainer = styled(() => ({
  flex: 1,
  height: '100%',
  width: '100%',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: 0,
}))(View);

class MapFeed extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = ({ navigation }) => ({
    ...headerOptions,
    title: 'Map',
  });

  static propTypes = {
    /** Functions passed down from React Navigation to use in navigating to/from
     * items in the feed.
     */
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  render() {
    const { height, width } = Dimensions.get('window');

    return (
      <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
        <InlineWebViewContainer>
          <WebView
            source={{
              uri:
                'https://www.christfellowshipconference.com/map?device=apollosApp',
            }}
            style={{ flex: 1, width, height }}
            scrollEnabled
          />
        </InlineWebViewContainer>
      </SafeAreaView>
    );
  }
}

export default createStackNavigator(
  {
    MapFeed,
  },
  {
    initialRouteName: 'MapFeed',
  }
);
