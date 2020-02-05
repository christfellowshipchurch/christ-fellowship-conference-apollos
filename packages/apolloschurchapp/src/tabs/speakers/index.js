import React from 'react';
import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import ContentSingle from '../../content-single/ContentSingle';
import Speakers from './Speakers';

export const HomeNavigator = createStackNavigator(
  {
    Speakers,
    ContentSingle,
  },
  {
    initialRouteName: 'Speakers',
  }
);

HomeNavigator.navigationOptions = {
  title: 'speakers',
  tabBarIcon: tabBarIcon('users'),
  tabBarOptions: {
    activeTintColor: '#00aeef',
  },
};

export default HomeNavigator;
