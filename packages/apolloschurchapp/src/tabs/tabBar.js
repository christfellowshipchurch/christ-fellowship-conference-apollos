import React from 'react';
import { compose } from 'recompose';
import { Platform, View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';

import { MediaPlayerSpacer } from 'apolloschurchapp/src/ui/MediaPlayer';
import { styled, withTheme } from '@apollosproject/ui-kit';

const mediaPlayerIsVisibleQuery = gql`
  query {
    mediaPlayer @client {
      isVisible
    }
  }
`;

// TODO : Add property color that passes a HEX Code for the color of the icon when it's Active

const TabBarWrapper = styled(({ theme, mediaPlayerIsVisible }) => ({
  backgroundColor: mediaPlayerIsVisible
    ? theme.colors.screen
    : theme.colors.paper,
  ...Platform.select(theme.shadows.default),
}))(View);

const ThemedBottomTabBar = compose(
  withTheme(({ theme, activeTintColor }) => ({
    showLabel: true,
    activeTintColor,
    inactiveTintColor: theme.colors.text.tertiary,
  })),
  styled(({ theme }) => ({
    borderTopWidth: 0,
    backgroundColor: theme.colors.transparent,
  }))
)(BottomTabBar);

const TabBar = (props) => (
  <Query query={mediaPlayerIsVisibleQuery}>
    {({ data = {} }) => (
      <TabBarWrapper mediaPlayerIsVisible={get(data, 'mediaPlayer.isVisible')}>
        <MediaPlayerSpacer>
          <ThemedBottomTabBar
            {...props}
            safeAreaInset={{ bottom: 'never', top: 'never' }}
          />
        </MediaPlayerSpacer>
      </TabBarWrapper>
    )}
  </Query>
);

export default TabBar;
