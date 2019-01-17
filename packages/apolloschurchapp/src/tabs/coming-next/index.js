import React from 'react';
import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import ComingNext from './ComingNext';

export const ComingNextNavigator = createStackNavigator(
  {
    ComingNext,
  },
  {
    initialRouteName: 'ComingNext',
  }
);

ComingNextNavigator.navigationOptions = {
  title: 'home',
  tabBarIcon: tabBarIcon('home'),
  tabBarOptions: {
    activeTintColor: '#00aeef',
  },
};

export default ComingNextNavigator;
