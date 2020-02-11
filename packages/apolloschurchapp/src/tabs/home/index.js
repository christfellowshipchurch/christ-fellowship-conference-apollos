import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import ContentSingle from '../../content-single/ContentSingle';
import Home from './Home';

export const HomeNavigator = createStackNavigator(
  {
    Home,
    ContentSingle,
  },
  {
    initialRouteName: 'Home',
  }
);

HomeNavigator.navigationOptions = {
  title: 'home',
  tabBarIcon: tabBarIcon('home'),
  tabBarOptions: {
    activeTintColor: '#00aeef',
  },
};

export default HomeNavigator;
