import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import SafeAreaView from 'react-native-safe-area-view';

import { FeedView, H1, H3, H4, styled } from '@apollosproject/ui-kit';
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
  marginHorizontal: theme.sizing.baseUnit,
  marginBottom: theme.sizing.baseUnit,

  paddingTop: theme.sizing.baseUnit * 1.5,
  paddingBottom: theme.sizing.baseUnit * 1.5,

  borderBottomColor: theme.colors.lightSecondary,
  borderBottomWidth: 1,

  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}))(View);

const Subtitle = styled(({ theme }) => ({
  textAlign: 'center',
}))(Text);

const HeaderContainer = ({ content }) => (
  <Container>
    <H3>{content}</H3>
  </Container>
);

class ContentItemFeed extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  // static navigationOptions = {
  //   header: NavigationHeader,
  // };

  static navigationOptions = ({ navigation }) => {
    const title = get(navigation, 'state.params.title');
    return {
      headerTitle: title || null,
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
              );
            }}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default ContentItemFeed;
