import React, { PureComponent } from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { Query } from 'react-apollo';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { FeedView, BackgroundView, styled } from '@apollosproject/ui-kit';
import headerOptions from '../headerOptions';

import ContentCardConnected from '../../ui/ContentCardConnected';

import getUserFeed from './getUserFeed';
import defaultCardContent from './defaultCard';

const FlexImageBackground = styled(({ theme }) => ({
  flex: 1,
  textAlign: 'center',
}))(ImageBackground);

const Logo = styled(({ theme }) => ({
  flex: 1,
  resizeMode: 'contain',
  width: '70%',
  height: '30%',
  alignSelf: 'center',
}))(Image);

const Header = styled(({ theme }) => ({
  alignSelf: 'center',
  textTransform: 'lowercase',
  fontWeight: 'bold',
  color: 'black',
  fontSize: 16,
}))(Text);

class ComingNext extends PureComponent {
  static navigationOptions = {
    headerTitle: null,
    headerRight: headerOptions.headerRight,
    headerStyle: {
      backgroundColor: '#00aeef',
      shadowColor: 'transparent',
    },
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
        {/* <BackgroundImg source={require('./background.png')} /> */}
        <FlexImageBackground
          source={require('./background.png')}
          resizeMode={'cover'}
        >
          <Logo source={require('./logo.png')} />
          <Header>See what&apos;s coming up next:</Header>
          <SafeAreaView>
            <Query query={getUserFeed} fetchPolicy="cache-and-network">
              {({ loading, error, data, refetch }) =>
                console.log(error, data) || (
                  <FeedView
                    ListItemComponent={ContentCardConnected}
                    content={get(data, 'userFeed.edges', []).map(
                      (edge) => edge.node
                    )}
                    isLoading={loading}
                    error={error}
                    refetch={refetch}
                    onPressItem={this.handleOnPress}
                  />
                )
              }
            </Query>
          </SafeAreaView>
        </FlexImageBackground>
      </BackgroundView>
    );
  }
}

export default ComingNext;
