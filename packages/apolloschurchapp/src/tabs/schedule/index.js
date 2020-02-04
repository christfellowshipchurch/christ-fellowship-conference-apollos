import React from 'react';
import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import ContentSingle from '../../content-single/ContentSingle';
import Schedule from './Schedule';

export const HomeNavigator = createStackNavigator(
  {
    Schedule,
    ContentSingle,
  },
  {
    initialRouteName: 'Schedule',
  }
);

HomeNavigator.navigationOptions = {
  title: 'schedule',
  tabBarIcon: tabBarIcon('calendar'),
  tabBarOptions: {
    activeTintColor: '#00aeef',
  },
};

export default HomeNavigator;
