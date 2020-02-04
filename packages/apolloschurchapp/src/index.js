import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { withTheme } from '@apollosproject/ui-kit';
import MediaPlayer from 'apolloschurchapp/src/ui/MediaPlayer';
import BackgroundView from './ui/BackgroundView';
import Providers from './Providers';
import NotificationsInit from './Notifications';
import NavigationService from './NavigationService';
import ContentSingle from './content-single';
import Tabs from './tabs';
import Auth from './auth';
import UserWebView from './user-web-view';
import Connect from './tabs/connect';
import PersonalDetails from './user-settings/PersonalDetails';
import ChangePassword from './user-settings/ChangePassword';

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: 'dark-content',
  backgroundColor: theme.colors.paper,
}))(StatusBar);

const AppNavigator = createStackNavigator(
  {
    Tabs,
    ContentSingle,
    Auth,
    PersonalDetails,
    ChangePassword,
    UserWebView,
    Connect,
  },
  {
    initialRouteName: 'Tabs',
  }
);

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar />
      <AppNavigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
      <NotificationsInit />
      <MediaPlayer />
    </BackgroundView>
  </Providers>
);

export default App;
