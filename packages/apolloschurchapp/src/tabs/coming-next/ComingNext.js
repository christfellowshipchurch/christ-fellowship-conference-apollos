import React, { PureComponent } from 'react';
import { Image, ImageBackground, Text } from 'react-native';
import { Query } from 'react-apollo';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { FeedView, styled } from '@apollosproject/ui-kit';
import BackgroundView from '../../ui/BackgroundView';
import headerOptions from '../headerOptions';

import ContentCardConnected from '../../ui/ContentCardConnected';

import getUserFeed from './getUserFeed';

const FlexImageBackground = styled({
  flex: 1,
  textAlign: 'center',
})(ImageBackground);

const Logo = styled({
  flex: 1,
  resizeMode: 'contain',
  width: '70%',
  height: '30%',
  alignSelf: 'center',
})(Image);

const Header = styled({
  alignSelf: 'center',
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  color: 'black',
  fontSize: 16,
  paddingLeft: '20%',
  paddingRight: '20%',
})(Text);

const CenteredText = styled({
  textAlign: 'center',
})(Text);

class ComingNext extends PureComponent {
  static navigationOptions = {
    headerTitle: null,
    headerRight: headerOptions.headerRight,
    headerStyle: {
      backgroundColor: '#00aeef',
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0,
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
      <BackgroundView colors={['#00aeef', '#00aeef']}>
        <FlexImageBackground
          source={require('./background.png')}
          resizeMode={'cover'}
        >
          <Logo source={require('../logo-white.png')} />
          <Header>coming up next:</Header>
          <CenteredText>pull down to refresh</CenteredText>
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
                  onPressItem={this.handleOnPress}
                />
              )}
            </Query>
          </SafeAreaView>
        </FlexImageBackground>
      </BackgroundView>
    );
  }
}

export default ComingNext;
