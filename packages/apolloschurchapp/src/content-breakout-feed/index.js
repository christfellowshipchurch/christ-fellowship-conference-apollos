import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import SafeAreaView from 'react-native-safe-area-view';

import { FeedView, H3, styled } from '@apollosproject/ui-kit';
import ContentCardConnected from 'apolloschurchapp/src/ui/ContentCardConnected';
import BackgroundView from '../ui/BackgroundView';

import { MyBreakoutsBar } from '../my-breakouts-bar';

// import NavigationHeader from '../content-single/NavigationHeader';
import getContentFeed from './getContentFeed';

/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.
 */
const Container = styled(({ theme }) => ({
  maxHeight: '20%',

  borderBottomColor: theme.colors.lightSecondary,
  borderBottomWidth: 1,

  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: 'white',
}))(View);

class ContentItemFeed extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  // static navigationOptions = {
  //   header: NavigationHeader,
  // };

  static navigationOptions = ({ navigation }) => {
    const title = get(navigation, 'state.params.title');
    return {
      headerTitle: title || null,
      headerStyle: {
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
        marginBottom: -5,
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
            {({ loading, error, data, refetch }) => {
              if (
                get(data, 'node.title') &&
                get(data, 'node.title') !==
                  this.props.navigation.getParam('title')
              ) {
                this.props.navigation.setParams({
                  title: get(data, 'node.title'),
                });
              }
              return (
                <View>
                  <Container>
                    <H3>{get(data, 'node.htmlContent')}</H3>
                    <MyBreakoutsBar />
                  </Container>
                  <FeedView
                    ListItemComponent={ContentCardConnected}
                    content={get(data, 'node.conferenceGroups', [])}
                    isLoading={loading}
                    error={error}
                    refetch={refetch}
                    onPressItem={this.handleOnPress}
                    // ListHeaderComponent={

                    // }
                  />
                </View>
              );
            }}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default ContentItemFeed;
