import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { Query } from 'react-apollo';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { FeedView, BackgroundView } from '@apollosproject/ui-kit';

import ContentCardConnected from '../../ui/ContentCardConnected';
import NavigationHeader from '../../ui/NavigationHeader';
import getSpeakers from './getSpeakers';

class Speakers extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: <NavigationHeader scrollY={params.scrollY} title="Speakers" />,
    };
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
      scrollY: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ scrollY: this.state.scrollY });
  }

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
      headerTitle: 'Speakers',
    });

  render() {
    return (
      <BackgroundView>
        <SafeAreaView>
          <Query query={getSpeakers} fetchPolicy="cache-and-network">
            {({ loading, error, data, refetch }) => (
              <FeedView
                ListItemComponent={ContentCardConnected}
                content={get(data, 'guestSpeakers.edges', []).map(
                  (edge) => edge.node
                )}
                isLoading={loading}
                error={error}
                refetch={refetch}
                onPressItem={this.handleOnPress}
                onScroll={Animated.event([
                  {
                    nativeEvent: { contentOffset: { y: this.state.scrollY } },
                  },
                ])}
              />
            )}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Speakers;
