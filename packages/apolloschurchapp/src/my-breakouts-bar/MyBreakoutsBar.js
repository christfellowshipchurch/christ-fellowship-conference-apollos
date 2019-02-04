import React from 'react';
import { Text } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import { Card, TouchableScale, styled } from '@apollosproject/ui-kit';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { UserWebBrowserConsumer } from '../user-web-view/Provider';

import getLoginState from '../auth/getLoginState';
import getOverrideStatus from './getOverrideStatus';

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
        <Query query={getOverrideStatus} fetchPolicy="cache-and-network">
          {({ loading: overrideLoading, data: overrideData }) => {
            console.log('Logging Override Data: ', overrideData);

            const activeFeatures = get(
              overrideData,
              'currentUser.profile.activeFeatures',
              []
            );
            const rockGuid = get(overrideData, 'currentUser.rockGuid', '');
            const MY_BREAKOUTS_KEY = 'MY-BREAKOUTS';

            return activeFeatures
              .map((feature) => feature.toUpperCase())
              .includes(MY_BREAKOUTS_KEY) ? (
              <UserWebBrowserConsumer>
                {(openUrl) => (
                  <TouchableScale
                    onPress={() =>
                      openUrl(
                        `https://my.christfellowshipconference.com/mybreakouts?person=${rockGuid}`
                      )
                    }
                  >
                    <LiveCard isLoading={overrideLoading}>
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
      ) : null;
    }}
  </Query>
);

export default MyBreakoutsBar;
