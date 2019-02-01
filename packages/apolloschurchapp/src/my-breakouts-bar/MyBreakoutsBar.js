import React from 'react';
import { Text } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import { Card, TouchableScale, styled } from '@apollosproject/ui-kit';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { UserWebBrowserConsumer } from '../user-web-view/Provider';

import getLoginState from '../auth/getLoginState';

const LiveCard = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit * 0.75,

  backgroundColor: theme.colors.primary,
  color: 'white',
}))(Card);

const CardTitle = styled({
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
})(Text);

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
                <CardTitle>
                  {'Select and check in to my breakouts  '}
                  <FontAwesome5 name={'angle-right'} />
                </CardTitle>
              </LiveCard>
            </TouchableScale>
          )}
        </UserWebBrowserConsumer>
      ) : null;
    }}
  </Query>
);

export default MyBreakoutsBar;
