import React, { PureComponent } from 'react';
import { View, ScrollView, SafeAreaView, Text, Image } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { HeaderBackButton, withNavigation } from 'react-navigation';

import { LoginButton } from 'apolloschurchapp/src/auth';
import {
  H1,
  H3,
  BodyText,
  Paragraph,
  BackgroundView,
  withTheme,
  styled,
  Icon,
  PaddedView,
  Button,
  ButtonLink,
} from '@apollosproject/ui-kit';
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
const Title = styled(({ theme }) => ({
  color: theme.colors.primary,
  paddingBottom: theme.helpers.verticalRhythm(1.5),
}))(H3);

const Logo = styled(({ theme }) => ({
  resizeMode: 'contain',
  width: '70%',
  height: '30%',
  alignSelf: 'center',
}))(Image);

const BrandIcon = withTheme(({ theme }) => ({
  name: 'brand-icon',
  size: theme.sizing.baseUnit * 2.25,
  marginBottom: theme.sizing.baseUnit,
  fill: theme.colors.primary,
}))(Icon);

const Header = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 3,
  height: '100%',
  backgroundColor: theme.colors.background.paper,
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

class Connect extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'Connect',
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
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
                <SafeAreaView>
                  <ScrollView>
                    <UserAvatarHeaderConnected key="UserAvatarHeaderConnected" />
                    <ActionTable />
                  </ScrollView>
                </SafeAreaView>
              );

            return (
              <SafeAreaView style={{ flex: 1, height: '100%' }}>
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
              </SafeAreaView>
            );
          }}
        </Query>
      </BackgroundView>
    );
  }
}

export default Connect;
