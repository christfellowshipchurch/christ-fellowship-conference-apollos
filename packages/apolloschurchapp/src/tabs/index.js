import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { capitalize, lowerCase } from 'lodash';
import { client } from '../client';

import ContentChannelFeed from '../content-channel-feed';
import ContentGroupFeed from '../content-group-feed';
import tabBarIcon from './tabBarIcon';
import TabBar from './tabBar';

import Home from './home';
import ComingNext from './coming-next';

import getNavigation from './getNavigationQuery';

const createTabNavigator = (data) => {
  const tabObject = {
    ComingNext,
  };

  // Loop through each of the Items returned by Graph

  data.getMobileNavigationChannel.forEach((tab) => {
    if (tab.itemContentChannel === null && tab.itemGroup == null) return;

    const isGroup = !tab.itemContentChannel;

    const RenderComponent = isGroup ? ContentGroupFeed : ContentChannelFeed;

    const itemId = isGroup ? tab.itemGroup.id : tab.itemContentChannel.id;

    tabObject[capitalize(tab.title)] = {
      screen: () => (
        <RenderComponent name={tab.title} screenProps={{ itemId }} />
      ),
      navigationOptions: {
        title: lowerCase(tab.title),
        tabBarIcon: tabBarIcon(tab.icon),
        tabBarOptions: {
          activeTintColor: tab.color,
        },
      },
    };
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
