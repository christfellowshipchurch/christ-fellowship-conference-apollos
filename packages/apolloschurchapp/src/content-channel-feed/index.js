import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import SafeAreaView from 'react-native-safe-area-view';

import { BackgroundView, FeedView, styled } from '@apollosproject/ui-kit';

import ContentCardConnected from 'apolloschurchapp/src/ui/ContentCardConnected';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationService from '../NavigationService';

import { LiveButton } from '../live';

import getContentFeed from './getContentFeed';

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.
 */

class ContentChannelFeed extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = ({ navigation }) => {
    const itemTitle = navigation.getParam('itemTitle', 'Content Channel');
    return {
      title: itemTitle,

      headerTitle: <LogoTitle source={require('./wordmark.png')} />,
      headerRight: (
        <FontAwesome5.Button
          name={'user-circle'}
          solid
          size={26}
          color="#00aeef"
          backgroundColor="transparent"
          underlayColor="transparent"
          onPress={() => {
            console.log('Pressed the Profile Button');
          }}
        />
      ),
      headerStyle: {
        backgroundColor: '#FFFFFF',
        shadowColor: 'transparent',
      },
    };
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

  /** Function that is called when a card in the feed is pressed.
   * Takes the user to the ContentSingle
   */
  handleOnPress = (item) => {
    NavigationService.navigate('ContentSingle', {
      itemId: item.id,
      sharing: item.sharing,
    });
  };

  render() {
    const itemId = this.props.screenProps.itemId;

    return (
      <BackgroundView>
        <SafeAreaView>
          <Query
            query={getContentFeed}
            variables={{ itemId }}
            fetchPolicy="cache-and-network"
          >
            {({ loading, error, data, refetch }) => (
              <FeedView
                ListItemComponent={ContentCardConnected}
                content={get(
                  data,
                  'node.childContentItemsConnection.edges',
                  []
                ).map((edge) => edge.node)}
                isLoading={loading}
                error={error}
                refetch={refetch}
                onPressItem={this.handleOnPress}
              />
            )}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default ContentChannelFeed;
