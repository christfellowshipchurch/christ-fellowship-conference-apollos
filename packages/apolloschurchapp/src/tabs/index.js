import React, { Component } from 'react';
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
import GroupView from './discover';

import getNavigation from './getNavigationQuery';

const createTabNavigator = (data) => {
  const tabObject = {
    Home,
  };

  // Loop through each of the Items returned by Graph

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
