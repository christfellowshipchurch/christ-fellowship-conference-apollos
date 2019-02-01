import { createStackNavigator } from 'react-navigation';
import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { FeedView, FlexedView } from '@apollosproject/ui-kit';
import ContentCardConnected from 'apolloschurchapp/src/ui/ContentCardConnected';
import BackgroundView from '../ui/BackgroundView';
import ContentSingle from '../content-single/ContentSingle';
import { MyBreakoutsBar } from '../my-breakouts-bar';

import headerOptions from '../tabs/headerOptions';
import getGroupFeed from './getGroupFeed';
/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.
 */

class ContentGroupFeed extends PureComponent {
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
    }),
  };

  /** Function that is called when a card in the feed is pressed.
   * Takes the user to the ContentSingle
   */
  handleOnPress = (item) => {
    const destination = item.childGroups.length
      ? 'ContentChildGroupFeed'
      : 'ContentSingle';
    this.props.navigation.navigate(destination, {
      itemId: item.id,
      sharing: item.sharing,
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
          query={getGroupFeed}
          variables={{ itemId }}
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data, refetch }) => (
            <FlexedView>
              <MyBreakoutsBar />
              <FeedView
                ListItemComponent={ContentCardConnected}
                content={get(data, 'node.childGroups', [])}
                isLoading={loading}
                error={error}
                refetch={refetch}
                onPressItem={this.handleOnPress}
                // ListHeaderComponent={}
              />
            </FlexedView>
          )}
        </Query>
      </BackgroundView>
    );
  }
}

const ContentGroupFeedNavigator = createStackNavigator(
  {
    ContentGroupFeed,
    ContentChildGroupFeed: ContentGroupFeed,
    ContentSingle,
  },
  {
    initialRouteName: 'ContentGroupFeed',
  }
);

ContentGroupFeedNavigator.navigationOptions = {
  header: null,
};

export default ContentGroupFeedNavigator;
