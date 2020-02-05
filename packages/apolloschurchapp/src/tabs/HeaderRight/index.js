import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styled, ConnectedImage, Touchable } from '@apollosproject/ui-kit';

import NavigationService from '../../NavigationService';
import getLoginState from '../connect/getLoginState';
import { getCurrentUser } from './queries';

const AvatarWrapper = styled(({ theme }) => ({
  marginRight: theme.sizing.baseUnit,
  height: 32,
  width: 32,
  borderRadius: 18,
  ...Platform.select(theme.shadows.default),
}))(Touchable);

const AvatarImage = styled(({ theme }) => ({
  height: 32,
  width: 32,
  borderRadius: 18,
  ...Platform.select(theme.shadows.default),
}))(ConnectedImage);

class ProfileIcon extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FontAwesome5.Button
        name={'user-circle'}
        solid
        size={26}
        color="#303030"
        backgroundColor="transparent"
        underlayColor="transparent"
        onPress={() => {
          NavigationService.navigate('Connect');
        }}
      />
    );
  }
}

class UserProfilePhoto extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query query={getCurrentUser}>
        {({ data, loading, error }) => {
          const photo = get(data, 'currentUser.profile.photo', { uri: '' });

          return error || loading ? (
            <ProfileIcon />
          ) : (
              <AvatarWrapper
                onPress={() => {
                  NavigationService.navigate('Connect');
                }}
              >
                <AvatarImage source={photo} />
              </AvatarWrapper>
            );
        }}
      </Query>
    );
  }
}

class ProfileIconConnected extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query query={getLoginState}>
        {({ data }) => {
          const isLoggedIn = get(data, 'isLoggedIn', false);

          return isLoggedIn ? <UserProfilePhoto /> : <ProfileIcon />;
        }}
      </Query>
    );
  }
}

export default ProfileIconConnected;
