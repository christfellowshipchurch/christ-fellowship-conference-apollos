import React from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import {
  Card,
  CardContent,
  TouchableScale,
  styled,
  ChannelLabel,
  UIText,
} from '@apollosproject/ui-kit';
import { UserWebBrowserConsumer } from '../user-web-view/Provider';

import getLoginState from '../auth/getLoginState';

const LiveCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  color: 'white',
}))(Card);

const StyledText = styled(({ theme }) => ({
  color: 'white',
}))(UIText);

const MyBreakoutsBar = () => (
  <Query query={getLoginState}>
    {({ loading, data }) => {
      const isLoggedIn = get(data, 'isLoggedIn', false);

      return isLoggedIn ? (
        <UserWebBrowserConsumer>
          {(openUrl) => (
            <TouchableScale
              onPress={() =>
                openUrl('https://my.christfellowshipconference.com/mybreakouts')
              }
            >
              <LiveCard isLoading={loading}>
                <CardContent>
                  <ChannelLabel
                    // icon="video"
                    label={
                      <StyledText color="white">
                        <StyledText bold>{'My Breakouts: '}</StyledText>
                        {`Select and check in here`}
                      </StyledText>
                    }
                  />
                </CardContent>
              </LiveCard>
            </TouchableScale>
          )}
        </UserWebBrowserConsumer>
      ) : null;
    }}
  </Query>
);

export default MyBreakoutsBar;
