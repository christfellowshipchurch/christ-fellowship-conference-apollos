import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { FeedView, H3, styled, FlexedView } from '@apollosproject/ui-kit';
import ContentCardConnected from 'apolloschurchapp/src/ui/ContentCardConnected';
import BackgroundView from '../ui/BackgroundView';

import { MyBreakoutsBar } from '../my-breakouts-bar';

import getContentFeed from './getContentFeed';

/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.
 */
const Container = styled(({ theme }) => ({
  borderBottomColor: theme.colors.lightSecondary,
  borderBottomWidth: 1,
  paddingVertical: theme.sizing.baseUnit * 0.5,
  backgroundColor: 'white',
}))(View);

const CenteredH3 = styled({ textAlign: 'center' })(H3);

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
              <FlexedView>
                <Container>
                  <CenteredH3>{get(data, 'node.htmlContent')}</CenteredH3>
                  <MyBreakoutsBar />
                </Container>
                <FeedView
                  ListItemComponent={ContentCardConnected}
                  content={get(data, 'node.conferenceGroups', [])}
                  isLoading={loading}
                  error={error}
                  refetch={refetch}
                  onPressItem={this.handleOnPress}
                />
              </FlexedView>
            );
          }}
        </Query>
      </BackgroundView>
    );
  }
}

export default ContentItemFeed;
