import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { BackgroundView, FlexedView, withTheme } from '@apollosproject/ui-kit';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import NavigationHeader from '../../ui/NavigationHeader';
import BreakoutsWithFilter from './BreakoutsWithFilter';

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
  static navigationOptions = {
    header: <NavigationHeader title="Breakouts" />,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  handleIndexChange = (index) => {
    this.setState({
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

        <FlexedView>
          <BreakoutsWithFilter
            filter={this.state.selectedIndex > 0 ? 'CATEGORIES' : 'TIMES'}
            onPressItem={this.handleOnPress}
          />
        </FlexedView>
      </BackgroundView>
    );
  }
}

export default Breakouts;
