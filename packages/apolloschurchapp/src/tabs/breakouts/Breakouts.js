import React, { PureComponent } from 'react';
import { Animated, View, Text, Platform } from 'react-native';
import { Query } from 'react-apollo';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  FeedView,
  BackgroundView,
  FlexedView,
  styled,
  withTheme,
  H1,
} from '@apollosproject/ui-kit';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Swiper from 'react-native-swiper';

import Color from 'color';
import NavigationHeader from '../../ui/NavigationHeader';
import BreakoutsWithFilter from './BreakoutsWithFilter';
import getSchedule from './getScheduleItems';

const StyledSegmentedControlTab = withTheme(({ theme }) => ({
  borderRadius: 8,
  tabsContainerStyle: {
    paddingHorizontal: theme.sizing.baseUnit,
    marginTop: theme.sizing.baseUnit,
    marginBottom: theme.sizing.baseUnit * 0.5,
    ...Platform.select(theme.shadows.default),
  },
  tabStyle: {
    paddingVertical: theme.sizing.baseUnit * 0.5,
    borderColor: theme.colors.lightSecondary,
    backgroundColor: theme.colors.lightPrimary,
  },
  activeTabStyle: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  tabTextStyle: {
    color: theme.colors.lightSecondary,
    fontWeight: 'bold',
  },
}))(SegmentedControlTab);

class Breakouts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      selectedIndex: 0,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: <NavigationHeader scrollY={params.scrollY} title="Breakouts" />,
    };
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  componentDidMount() {
    this.props.navigation.setParams({ scrollY: this.state.scrollY });
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  handleOnPress = (item) =>
    this.props.navigation.navigate('BreakoutList', {
      filter: {
        key: this.state.selectedIndex > 0 ? 'category' : 'time',
        value: item.title,
      },
      transitionKey: item.transitionKey,
      title: item.title,
    });

  render() {
    return (
      <BackgroundView>
        <StyledSegmentedControlTab
          values={['Session', 'Category']}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />

        <BreakoutsWithFilter
          filter={this.state.selectedIndex > 0 ? 'CATEGORIES' : 'TIMES'}
          onPressItem={this.handleOnPress}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.state.scrollY } },
            },
          ])}
        />
      </BackgroundView>
    );
  }
}

export default Breakouts;
