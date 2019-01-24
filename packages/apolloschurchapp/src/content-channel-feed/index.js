import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import SafeAreaView from 'react-native-safe-area-view';

import { createStackNavigator } from 'react-navigation';
import { BackgroundView, FeedView } from '@apollosproject/ui-kit';

import ContentCardConnected from 'apolloschurchapp/src/ui/ContentCardConnected';
import ContentItemFeed from '../content-item-feed';
import ContentSingle from '../content-single/ContentSingle';
import ContentBreakoutFeed from '../content-breakout-feed';

import headerOptions from '../tabs/headerOptions';
import getContentFeed from './getContentFeed';

/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.
 */

class ContentChannelFeed extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = ({ navigation }) => {
    const itemTitle = navigation.getParam('itemTitle', '');

    return {
      ...headerOptions,
      title: itemTitle,
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
    screenProps: PropTypes.shape({
      itemId: PropTypes.string.isRequired,
    }).isRequired,
  };

  /** Function that is called when a card in the feed is pressed.
   * Takes the user to the ContentSingle
   */
  handleOnPress = (item) => {
    const destination = item.childContentItemsConnection.edges.length
      ? 'ContentItemFeed'
      : 'ContentSingle';
    this.props.navigation.navigate(destination, {
      itemId: item.id,
    });
  };

  render() {
    const itemId = this.props.navigation.getParam(
      'itemId',
      get(this.props, 'screenProps.itemId')
    );

    return (
      <BackgroundView>
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
      </BackgroundView>
    );
  }
}

const ContentChannelFeedNavigator = createStackNavigator(
  {
    ContentChannelFeed,
    ContentItemFeed,
    ContentSingle,
    ContentBreakoutFeed,
  },
  {
    initialRouteName: 'ContentChannelFeed',
  }
);

ContentChannelFeedNavigator.navigationOptions = {
  header: null,
};

export default ContentChannelFeedNavigator;
