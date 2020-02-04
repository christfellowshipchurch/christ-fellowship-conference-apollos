import React from 'react';
import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import Map from './Map';

export const HomeNavigator = createStackNavigator(
  {
    Map,
  },
  {
    initialRouteName: 'Map',
  }
);

HomeNavigator.navigationOptions = {
  title: 'map',
  tabBarIcon: tabBarIcon('map-marked-alt'),
  tabBarOptions: {
    activeTintColor: '#00aeef',
  },
};

export default HomeNavigator;
