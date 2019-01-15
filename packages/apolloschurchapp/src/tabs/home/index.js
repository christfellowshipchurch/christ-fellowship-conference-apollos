import React from 'react';
import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import Home from './Home';

export const HomeNavigator = createStackNavigator(
  {
    Home,
  },
  {
    initialRouteName: 'Home',
  }
);

HomeNavigator.navigationOptions = {
  tabBarIcon: tabBarIcon('home'),
  tabBarOptions: {
    activeTintColor: '#00aeef',
  },
};

export default HomeNavigator;
