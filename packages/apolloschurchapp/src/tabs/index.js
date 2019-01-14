import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { capitalize, lowerCase } from 'lodash';
import SplashScreen from 'react-native-splash-screen';
import { client } from '../client';

import ContentChannelView from '../content-channel-feed/index';
import tabBarIcon from './tabBarIcon';
import TabBar from './tabBar';

import Connect from './connect';
import Home from './home';
import Discover from './discover';

import GroupView from './discover';

import getNavigation from './getNavigationQuery';

// const TabNavigator = createBottomTabNavigator(
//   {
//     Home,
//     Discover,
//     Connect,
//   },
//   {
//     tabBarComponent: TabBar,
//     lazy: true,
//     removeClippedSubviews: true,
//   }
// );

// TODO : Create a function that runs a query and returns creatBottomTabNavigator
//        apollo client instead of React Apollo

const createTabNavigator = (data) => {
  const tabObject = {};

  // Loop through each of the Items returned by Graph

  console.log('Logging Return Data: ', data);
  data.getMobileNavigationChannel.forEach((tab) => {
    if (tab.itemContentChannel === null && tab.group == null) return;

    console.log('Item Content Channel Id: ', tab.itemContentChannel.id);

    tabObject[capitalize(tab.title)] = tab.itemContentChannel
      ? {
          screen: (props) => (
            <ContentChannelView {...props} itemId={tab.itemContentChannel.id} />
          ),
          navigationOptions: {
            title: lowerCase(tab.title),
            tabBarIcon: tabBarIcon(tab.icon),
            tabBarOptions: {
              // TODO : Test to see if this actually works | https://github.com/react-navigation/react-navigation/issues/2818#issuecomment-421030796
              activeTintColor: tab.color,
            },
          },
          state: {
            params: { itemId: tab.itemContentChannel.id },
          },
        }
      : GroupView;
  });

  return createBottomTabNavigator(tabObject, {
    tabBarComponent: TabBar,
    lazy: true,
    removeClippedSubviews: true,
  });
};

class TabNavigator extends Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    const { data } = await client.query({ query: getNavigation });

    this.setState({ data });
  }

  render() {
    if (this.state.data === null) return null;

    const RockTabNavigator = createTabNavigator(this.state.data);

    return <RockTabNavigator />;
  }
}

TabNavigator.navigationOptions = {
  header: null,
};

export default TabNavigator;
