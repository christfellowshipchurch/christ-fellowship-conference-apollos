import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { capitalize, lowerCase } from 'lodash';

import { withTheme } from '@apollosproject/ui-kit';

import Home from './home';
import Speakers from './speakers';
import Schedule from './schedule';
import Breakouts from './breakouts';
import TabBar from './tabBar';
import Map from './map';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Schedule,
    Breakouts,
    Speakers,
    Map,
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
