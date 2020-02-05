import React, { PureComponent } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { get } from 'lodash';

import SafeAreaView from 'react-native-safe-area-view';
import { WebView } from 'react-native-webview';
import { styled, BackgroundView } from '@apollosproject/ui-kit';

import NavigationHeader from '../../ui/NavigationHeader';

const MAP_LINK = gql`
  query getMapUrl {
    mapUrl
  }
`;

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
  static navigationOptions = {
    header: <NavigationHeader title="Map" />,
  };

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

    console.log({ MAP_LINK });

    return (
      <BackgroundView>
        <Query query={MAP_LINK} fetchPolicy="cache-and-network">
          {({ loading, data, error }) => {
            console.log({ data, loading, error });
            return loading ? (
              <ActivityIndicator />
            ) : (
                <SafeAreaView style={{ flex: 1, width: '100%', height: '100%' }}>
                  <InlineWebViewContainer>
                    <WebView
                      source={{
                        uri: get(data, 'mapUrl', ''),
                      }}
                      style={{ flex: 1, width, height }}
                      scrollEnabled
                    />
                  </InlineWebViewContainer>
                </SafeAreaView>
              );
          }}
        </Query>
      </BackgroundView>
    );
  }
}

export default MapFeed;
