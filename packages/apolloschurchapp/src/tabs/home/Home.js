import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { FeedView, BackgroundView } from '@apollosproject/ui-kit';
import headerOptions from '../headerOptions';

import ContentCardConnected from '../../ui/ContentCardConnected';

import getUserFeed from './getUserFeed';

class Home extends PureComponent {
  static navigationOptions = {
    ...headerOptions,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  handleProfilePress = (item) =>
    this.props.navigation.navigate('Connect', {
      transitionKey: item.transitionKey,
    });

  render() {
    return (
      <BackgroundView>
        <SafeAreaView>
          <Query query={getUserFeed} fetchPolicy="cache-and-network">
            {({ loading, error, data, refetch }) => (
              <FeedView
                ListItemComponent={ContentCardConnected}
                content={get(data, 'userFeed.edges', []).map(
                  (edge) => edge.node
                )}
                isLoading={loading}
                error={error}
                refetch={refetch}
                // ListHeaderComponent={
                //   <>
                //     <LogoTitle source={require('./wordmark.png')} />
                //     <LiveButton />
                //   </>
                // }
                onPressItem={this.handleOnPress}
              />
            )}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Home;
