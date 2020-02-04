import { createStackNavigator } from 'react-navigation';

import UserSettings from 'apolloschurchapp/src/user-settings';

import TestingControlPanel from '../../testing-control-panel';
import Connect from './Connect';

const ConnectNavigator = createStackNavigator(
  {
    Connect,
    TestingControlPanel,
    UserSettings,
  },
  {
    initialRouteName: 'Connect',
  }
);

export default ConnectNavigator;

ConnectNavigator.navigationOptions = {
  header: null,
};
