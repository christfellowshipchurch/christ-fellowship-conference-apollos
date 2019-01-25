import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import SafeAreaView from 'react-native-safe-area-view';

import {
  BackgroundView,
  FeedView,
  H1,
  H4,
  styled,
} from '@apollosproject/ui-kit';

import ContentCardConnected from 'apolloschurchapp/src/ui/ContentCardConnected';
import { MyBreakoutsBar } from '../my-breakouts-bar';

import NavigationHeader from '../content-single/NavigationHeader';
import getContentFeed from './getContentFeed';

/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.
 */
const Container = styled(({ theme }) => ({
  marginHorizontal: theme.sizing.baseUnit,
  marginTop: theme.sizing.baseUnit * 2,
  marginBottom: theme.sizing.baseUnit,

  paddingTop: theme.sizing.baseUnit * 1.7,
  paddingBottom: theme.sizing.baseUnit * 2,

  borderBottomColor: theme.colors.lightSecondary,
  borderBottomWidth: 1,
}))(View);

const HeaderContainer = ({ title, content }) => (
  <Container>
    <H1>{title}</H1>
    <H4>{content}</H4>
  </Container>
);

class ContentItemFeed extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = {
    header: NavigationHeader,
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
    if (item.__typename !== 'ConferenceScheduleContentItem') {
      this.props.navigation.navigate('ContentSingle', {
        itemId: item.id,
      });
    }
  };

  render() {
    const itemId = this.props.navigation.getParam(
      'itemId',
      get(this.props, 'screenProps.itemId')
    );

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
                content={get(data, 'node.conferenceGroups', [])}
                isLoading={loading}
                error={error}
                refetch={refetch}
                onPressItem={this.handleOnPress}
                ListHeaderComponent={
                  <View>
                    <HeaderContainer
                      title={get(data, 'node.title')}
                      content={get(data, 'node.htmlContent')}
                    />
                    <MyBreakoutsBar />
                  </View>
                }
              />
            )}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default ContentItemFeed;
