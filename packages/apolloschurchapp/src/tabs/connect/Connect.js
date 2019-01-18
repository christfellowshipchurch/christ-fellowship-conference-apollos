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
import CallToAction from '../../ui/CallToAction';
import UserWebView from '../../user-web-view';
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
  paddingBottom: theme.sizing.baseUnit * 1.5,
  backgroundColor: theme.colors.background.paper,
  // paddingTop: theme.sizing.baseUnit * 4,
}))(PaddedView);

const StyledLoginButton = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit,
  color: theme.colors.text.link,
}))(LoginButton);

const StyledMaybeLaterButton = styled(({ theme }) => ({
  flex: 1,
  width: '100%',
  textAlign: 'center',
  marginVertical: theme.sizing.baseUnit,
}))(MaybeLaterButon);

const CallToActionContainer = styled(({ theme }) => ({
  marginTop: 30,
  marginBottom: 30,
}))(View);

const QRCodeContainer = styled(() => ({
  width: '100%',
  justifyContent: 'space-around',
  alignItems: 'center',
}))(View);

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
      <BackgroundView>
        <Query query={getLoginState}>
          {({ data }) => {
            if (get(data, 'isLoggedIn', false))
              return (
                <SafeAreaView>
                  <ScrollView>
                    <UserAvatarHeaderConnected key="UserAvatarHeaderConnected" />

                    <CallToActionContainer>
                      <CallToAction
                        icon="list"
                        title="my breakouts"
                        url="https://my.christfellowshipconference.com/page/206"
                        useCookie
                      />
                    </CallToActionContainer>
                    <QRCodeContainer>
                      <UserWebView
                        url={
                          'https://my.christfellowshipconference.com/mycheckincode'
                        }
                        webViewStyle={{ width: 300, height: 500 }}
                        modal={false}
                        scrollEnabled={false}
                        injectedJavaScript={`
                          try {
                            const css = '#cms-admin-footer { display: none !important; } .panel-default { border: none; box-shadow: none; }',
                                head = document.head || document.getElementsByTagName('head')[0],
                                style = document.createElement('style');

                            style.type = 'text/css';
                            style.appendChild(document.createTextNode(css));

                            head.appendChild(style);
                          } catch {}
                          true;
                        `}
                      />
                    </QRCodeContainer>
                    <ActionTable />
                  </ScrollView>
                </SafeAreaView>
              );

            return (
              <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                  <Header>
                    {/* <BrandIcon />
                    <Title>Christ Fellowship Conference 2019</Title> */}
                    <Logo source={require('../logo.png')} />
                    <Paragraph>
                      <BodyText>
                        We're so excited for everything coming up this year at
                        Christ Fellowhsip Conference! And this year, we've got a
                        new mobile experience to offer.
                      </BodyText>
                    </Paragraph>
                    <Paragraph>
                      <BodyText>
                        We've got a LOT packed into these few days with you. To
                        keep up with everything and to get a unique Conference
                        experience tailored to you, start by signing into your
                        Conference account.
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
