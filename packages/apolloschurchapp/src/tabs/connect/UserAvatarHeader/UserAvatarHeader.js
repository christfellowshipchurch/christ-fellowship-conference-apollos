import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withNavigation } from 'react-navigation';

import UserAvatarView from 'apolloschurchapp/src/ui/UserAvatarView';

import {
  withIsLoading,
  Touchable,
  ConnectedImage,
  Icon,
  withTheme,
  styled,
  PaddedView,
  FlexedView,
} from '@apollosproject/ui-kit';

const Container = styled(({ theme }) => ({
  alignItems: 'center',
  flexDirection: 'row',
  paddingTop: theme.sizing.baseUnit * 2,
}))(PaddedView);

const SettingsIcon = compose(
  withTheme(({ theme }) => ({
    name: 'settings',
    fill: theme.colors.text.tertiary,
  }))
)(Icon);

const UserAvatarHeader = ({
  firstName,
  lastName,
  church,
  department,
  jobTitle,
  photo,
  refetch,
  navigation,
  disabled,
  isLoading,
}) => (
    <Container>
      <StatusBar barStyle="dark-content" />
      <FlexedView>
        <UserAvatarView
          firstName={firstName}
          lastName={lastName}
          church={church}
          jobTitle={jobTitle}
          photo={photo}
          refetch={refetch}
          disabled={disabled}
          isLoading={isLoading}
        />
      </FlexedView>
      <Touchable
        onPress={() => navigation.navigate('UserSettings', { photo, refetch })}
      >
        <SettingsIcon />
      </Touchable>
    </Container>
  );

UserAvatarHeader.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  church: PropTypes.string,
  department: PropTypes.string,
  jobTitle: PropTypes.string,
  photo: ConnectedImage.propTypes.source,
  refetch: PropTypes.func,
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default withNavigation(withIsLoading(UserAvatarHeader));
