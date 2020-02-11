import { createStackNavigator } from 'react-navigation';

import tabBarIcon from '../tabBarIcon';

import ContentSingle from '../../content-single/ContentSingle';
import Breakouts from './Breakouts';
import BreakoutList from './BreakoutList';

export const HomeNavigator = createStackNavigator(
  {
    Breakouts,
    BreakoutList,
    ContentSingle,
  },
  {
    initialRouteName: 'Breakouts',
  }
);

HomeNavigator.navigationOptions = {
  title: 'breakouts',
  tabBarIcon: tabBarIcon('clipboard-list'),
  tabBarOptions: {
    activeTintColor: '#00aeef',
  },
};

export default HomeNavigator;
