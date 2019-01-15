import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { Button, Image, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  styled,
  withTheme,
  FeedView,
  BackgroundView,
} from '@apollosproject/ui-kit';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationService from '../../NavigationService';
import ContentCardConnected from '../../ui/ContentCardConnected';

import { LiveButton } from '../../live';

import getUserFeed from './getUserFeed';

// console.log(getUserFeed);

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

class Home extends PureComponent {
  static navigationOptions = () => ({
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
          NavigationService.navigate('Connect');
        }}
      />
    ),
    headerStyle: {
      backgroundColor: '#FFFFFF',
      shadowColor: 'transparent',
    },
  });

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
                  // ListHeaderComponent={
                  //   <>
                  //     <LogoTitle source={require('./wordmark.png')} />
                  //     <LiveButton />
                  //   </>
                  // }
                  onPressItem={this.handleOnPress}
                />
              )
            }
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Home;
