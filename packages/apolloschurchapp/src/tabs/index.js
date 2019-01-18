import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { capitalize, lowerCase } from 'lodash';
import { client } from '../client';

import ContentChannelFeed from '../content-channel-feed';
import ContentGroupFeed from '../content-group-feed';
import tabBarIcon from './tabBarIcon';
import TabBar from './tabBar';

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
    const initialRoute = isGroup ? 'ContentGroupFeed' : 'ContentChannelFeed';
    const itemId = isGroup ? tab.itemGroup.id : tab.itemContentChannel.id;

    let currentNavigator;
    tabObject[capitalize(tab.title)] = {
      screen: () => (
        <RenderComponent
          name={tab.title}
          screenProps={{ itemId }}
          ref={(navigatorRef) => {
            currentNavigator = navigatorRef;
          }}
        />
      ),
      navigationOptions: {
        title: lowerCase(tab.title),
        tabBarIcon: tabBarIcon(tab.icon),
        tabBarOptions: {
          activeTintColor: tab.color,
        },
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          if (currentNavigator && navigation.isFocused()) {
            return currentNavigator.dispatch(
              StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: initialRoute,
                    params: { itemId },
                  }),
                ],
              })
            );
          }
          return defaultHandler();
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

const DefaultNavigator = createTabNavigator({ getMobileNavigationChannel: [] });

class TabNavigator extends Component {
  state = {
    Navigator: null,
  };

  RockTabNavigator = null;

  async componentDidMount() {
    const { data } = await client.query({ query: getNavigation });

    const Navigator = createTabNavigator(data);
    this.setState({ Navigator });
  }

  render() {
    if (this.state.Navigator === null) return <DefaultNavigator />;

    const RockTabNavigator = this.state.Navigator;

    return <RockTabNavigator />;
  }
}

TabNavigator.navigationOptions = {
  header: null,
};

export default TabNavigator;
