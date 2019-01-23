/* eslint-disable react/display-name */
import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { styled } from '@apollosproject/ui-kit';
import CallToAction from '../../../ui/CallToAction';
import UserWebView from '../../../user-web-view';

import getUserProfile from '../getUserProfile';
import UserAvatarHeader from './UserAvatarHeader';

const CallToActionContainer = styled(({ theme }) => ({
  marginTop: 30,
  marginBottom: 30,
  flex: 1,
}))(View);

const QRCodeContainer = styled(() => ({
  width: '100%',
  justifyContent: 'space-around',
  alignItems: 'center',
  flex: 1,
}))(View);

const featuresMap = {
  'qr-code': () => (
    <QRCodeContainer>
      <UserWebView
        url={'https://my.christfellowshipconference.com/mycheckincode'}
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
  ),
  'my-breakouts': () => (
    <CallToActionContainer>
      <CallToAction
        icon="list"
        title="my breakouts"
        url="https://my.christfellowshipconference.com/page/206"
        useCookie
      />
    </CallToActionContainer>
  ),
  survey: () => (
    <CallToActionContainer>
      <CallToAction
        icon="list"
        title="survey"
        url="https://my.christfellowshipconference.com/survey"
        useCookie
      />
    </CallToActionContainer>
  ),
};
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
            activeFeatures = [],
          } = {},
        } = {},
      } = {},
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
          navigation={navigation}
          disabled
        />
        {activeFeatures
          .map((feature) => featuresMap[feature])
          .map((Component, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Component key={`${i}`} />
          ))}
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
