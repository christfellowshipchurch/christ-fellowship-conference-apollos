import { createStackNavigator } from 'react-navigation';

import UserSettings from 'apolloschurchapp/src/user-settings';

import TestingControlPanel from '../../testing-control-panel';
import Connect from './Connect';
import LikedContentList from './LikedContentList';

const ConnectNavigator = createStackNavigator(
  {
    Connect,
    TestingControlPanel,
    UserSettings,
    // LikedContentList,
  },
  {
    initialRouteName: 'Connect',
    headerMode: 'screen',
  }
);

export default ConnectNavigator;
