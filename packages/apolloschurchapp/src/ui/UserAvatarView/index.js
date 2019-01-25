import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import {
  H3,
  H4,
  H5,
  PaddedView,
  ConnectedImage,
  styled,
  ChannelLabel,
  withIsLoading,
} from '@apollosproject/ui-kit';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AvatarForm from './AvatarForm';

const Container = styled(({ theme }) => ({
  paddingBottom: 10,

  backgroundColor: theme.colors.background.paper,
  flexDirection: 'row',
}))(View);

const Content = styled(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  paddingVertical: theme.sizing.baseUnit * 0.5,
}))(PaddedView);

const LocationHeader = styled(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,

  color: theme.colors.darkSecondary,
}))(H5);

const JobTitleHeader = styled(({ theme }) => ({
  marginBottom: 5,

  color: theme.colors.lightSecondary,
  textTransform: 'lowercase',
}))(Text);

const UserAvatarView = withIsLoading(
  ({
    theme,
    photo,
    firstName,
    lastName,
    church,
    department,
    jobTitle,
    isLoading,
    refetch,
    onPhotoPress,
    setIsUploadingFile,
    isUploadingFile,
    disabled,
    ...viewProps
  }) => (
    // todo: handle file select stuff
    <Container {...viewProps}>
      <AvatarForm
        isLoading={isLoading}
        text={false}
        disabled={disabled}
        photo={photo}
        refetch={refetch}
      />
      <Content>
        <JobTitleHeader>{jobTitle}</JobTitleHeader>
        <H3>
          {firstName} {lastName}
        </H3>
        <LocationHeader>
          <FontAwesome5 name="building" />
          &nbsp;
          {church}, {department}
        </LocationHeader>

        {/* <ChannelLabel icon="pin" label={church || ''} isLoading={isLoading} /> */}
      </Content>
    </Container>
  )
);

UserAvatarView.propTypes = {
  photo: ConnectedImage.propTypes.source,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  location: PropTypes.string,
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
  onPhotoPress: PropTypes.func,
  blurIntensity: PropTypes.number,
  allowProfileImageChange: PropTypes.bool,
  ...View.propTypes,
};

export default UserAvatarView;
