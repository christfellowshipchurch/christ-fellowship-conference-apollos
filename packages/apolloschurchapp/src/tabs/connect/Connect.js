import React, { PureComponent } from 'react';
import { ScrollView, Image } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { HeaderBackButton, SafeAreaView } from 'react-navigation';

import { LoginButton } from 'apolloschurchapp/src/auth';
import {
  BodyText,
  Paragraph,
  styled,
  PaddedView,
  ButtonLink,
  FlexedView,
} from '@apollosproject/ui-kit';
import BackgroundView from '../../ui/BackgroundView';
import NavigationHeader from '../../ui/NavigationHeader';
import MyBreakouts from './MyBreakouts';
import ActionTable from './ActionTable';
import { UserAvatarHeaderConnected } from './UserAvatarHeader';
import getLoginState from './getLoginState';

const MaybeLaterButon = ({ navigation, style }) => (
  <ButtonLink
    title="Skip for now"
    onPress={() => navigation.goBack(null)}
    style={style}
  >
    Skip for now
  </ButtonLink>
);

const Logo = styled({
  resizeMode: 'contain',
  width: '70%',
  height: '30%',
  alignSelf: 'center',
})(Image);

const Header = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 3,
  height: '100%',
  backgroundColor: theme.overrides.background,
  // paddingTop: theme.sizing.baseUnit * 4,
}))(PaddedView);

const StyledLoginButton = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit,
  color: theme.colors.text.link,
}))(LoginButton);

const StyledMaybeLaterButton = styled(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginVertical: theme.sizing.baseUnit,
}))(MaybeLaterButon);

const StyledSafeAreaView = styled(({ theme }) => ({
  flex: 1,
  height: '100%',

  backgroundColor: theme.overrides.background,
}))(SafeAreaView);

class Connect extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavigationHeader
        nested
        title="My Profile"
        goBack={() => navigation.goBack(null)}
      />
    ),
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  render() {
    return (
      <BackgroundView style={{ flex: 1, height: '100%' }}>
        <Query query={getLoginState}>
          {({ data }) => {
            if (get(data, 'isLoggedIn', false))
              return (
                <FlexedView>
                  <UserAvatarHeaderConnected key="UserAvatarHeaderConnected" />
                  <ActionTable />
                  <ScrollView>
                    <MyBreakouts />
                  </ScrollView>
                </FlexedView>
              );

            return (
              <StyledSafeAreaView>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                  <Header>
                    <Logo source={require('../logo.png')} />
                    <Paragraph>
                      <BodyText>
                        Welcome to Christ Fellowship Conference. This year, we
                        have a new mobile experience for you.
                      </BodyText>
                    </Paragraph>
                    <Paragraph>
                      <BodyText>
                        Select and view your breakout schedule and stay up to
                        date with the latest information.
                      </BodyText>
                    </Paragraph>
                    <StyledLoginButton />
                    <StyledMaybeLaterButton
                      navigation={this.props.navigation}
                    />
                  </Header>
                </ScrollView>
              </StyledSafeAreaView>
            );
          }}
        </Query>
      </BackgroundView>
    );
  }
}

export default Connect;
