import { createBottomTabNavigator } from 'react-navigation';

import Home from './home';
import Speakers from './speakers';
import Schedule from './schedule';
import Breakouts from './breakouts';
import TabBar from './tabBar';
import Map from './map';
import Profile from './connect';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Schedule,
    Breakouts,
    Speakers,
    Map,
    Profile,
  },
  {
    tabBarComponent: TabBar,
    lazy: true,
    removeClippedSubviews: true,
    tabBarOptions: {
      // safeAreaInset: { bottom: 'never' },
    },
  }
);

TabNavigator.navigationOptions = {
  header: null,
};

export default TabNavigator;
