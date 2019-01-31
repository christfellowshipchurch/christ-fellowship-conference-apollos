import React from 'react';
import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import ContentSingle from '../../content-single/ContentSingle';
import ComingNext from './ComingNext';

export const ComingNextNavigator = createStackNavigator(
  {
    ComingNext,
    ContentSingle,
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
