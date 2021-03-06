import React, { PureComponent } from 'react';
import { Platform, View } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  styled,
  ConnectedImage,
  Touchable,
  FlexedView,
} from '@apollosproject/ui-kit';

import NavigationService from '../../NavigationService';
import { getCurrentUser, getLoginState } from './queries';

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
  borderRadius: 16,
  ...Platform.select(theme.shadows.default),
}))(ConnectedImage);

const ProfileIcon = () => (
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

const UserProfilePhoto = () => (
  <Query query={getCurrentUser}>
    {({ data, loading, error }) => {
      const photo = get(data, 'currentUser.profile.photo', { uri: '' });

      return error || loading || !photo.uri ? (
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

const ProfileIconConnected = () => (
  <FlexedView style={{ alignItems: 'flex-end', justifyContent: 'flex-start' }}>
    <Query query={getLoginState}>
      {({ data }) => {
        const isLoggedIn = get(data, 'isLoggedIn', false);

        return isLoggedIn ? <UserProfilePhoto /> : <ProfileIcon />;
      }}
    </Query>
  </FlexedView>
);

export default ProfileIconConnected;
