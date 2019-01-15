import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { capitalize, lowerCase } from 'lodash';
import { client } from '../client';

import ContentChannelFeed from '../content-channel-feed';
import tabBarIcon from './tabBarIcon';
import TabBar from './tabBar';

import Home from './home';
import Discover from './discover';
import GroupView from './discover';

import getNavigation from './getNavigationQuery';

const createTabNavigator = (data) => {
  const tabObject = {
    Home,
  };

  // Loop through each of the Items returned by Graph

  console.log('Logging Return Data: ', data);
  data.getMobileNavigationChannel.forEach((tab) => {
    if (tab.itemContentChannel === null && tab.group == null) return;

    const Feed = createStackNavigator(
      {
        ContentChannelFeed,
      },
      {
        initialRouteName: 'ContentChannelFeed',
      }
    );

    Feed.navigationOptions = {
      title: lowerCase(tab.title),
      tabBarIcon: tabBarIcon(tab.icon),
      tabBarOptions: {
        activeTintColor: tab.color,
      },
    };

    tabObject[capitalize(tab.title)] = tab.itemContentChannel
      ? {
          screen: () => (
            <Feed
              name={tab.title}
              screenProps={{ itemId: tab.itemContentChannel.id }}
            />
          ),
          navigationOptions: {
            title: lowerCase(tab.title),
            tabBarIcon: tabBarIcon(tab.icon),
            tabBarOptions: {
              activeTintColor: tab.color,
            },
            params: { itemId: tab.itemContentChannel.id },
          },
          params: { itemId: tab.itemContentChannel.id },
          state: {
            params: { itemId: tab.itemContentChannel.id },
          },
        }
      : GroupView;

    // tabObject[capitalize(tab.title)] = tab.itemContentChannel
    //   ? {
    //       screen: Feed,
    //       navigationOptions: {
    //         title: lowerCase(tab.title),
    //         tabBarIcon: tabBarIcon(tab.icon),
    //         tabBarOptions: {
    //           activeTintColor: tab.color,
    //         },
    //       },
    //       state: {
    //         params: { itemId: tab.itemContentChannel.id },
    //       },
    //     }
    //   : GroupView;

    // console.log(`Logging Feed Afterwards: `, tabObject[capitalize(tab.title)]);
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
