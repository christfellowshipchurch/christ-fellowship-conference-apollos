/* eslint-disable react/display-name */
import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import getUserProfile from '../getUserProfile';
import UserAvatarHeader from './UserAvatarHeader';

const UserAvatarHeaderConnected = ({ navigation }) => (
  <Query query={getUserProfile} fetchPolicy="cache-and-network">
    {({
      data: {
        currentUser: {
          profile: {
            photo,
            firstName,
            lastName,
            church,
            department,
            jobTitle,
          } = {},
        } = {},
      } = {},
      loading,
      refetch,
    }) => (
        <React.Fragment>
          <UserAvatarHeader
            firstName={firstName}
            lastName={lastName}
            church={church}
            department={department}
            jobTitle={jobTitle}
            photo={photo}
            refetch={refetch}
            loading={loading}
            navigation={navigation}
            disabled
          />
        </React.Fragment>
      )}
  </Query>
);

UserAvatarHeaderConnected.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }),
};

export default UserAvatarHeaderConnected;
