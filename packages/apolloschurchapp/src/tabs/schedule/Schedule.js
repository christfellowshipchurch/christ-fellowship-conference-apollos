import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { FeedView, BackgroundView } from '@apollosproject/ui-kit';

import ContentCardConnected from '../../ui/ContentCardConnected';
import NavigationHeader from '../../ui/NavigationHeader';
import getSchedule from './getScheduleItems';

class Schedule extends PureComponent {
  static navigationOptions = {
    header: <NavigationHeader title="Schedule" />,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
      headerTitle: 'Schedule',
    });

  render() {
    return (
      <BackgroundView>
        <SafeAreaView>
          <Query query={getSchedule} fetchPolicy="cache-and-network">
            {({ loading, error, data, refetch }) => (
              <FeedView
                ListItemComponent={ContentCardConnected}
                content={get(data, 'scheduleItems.edges', []).map(
                  (edge) => edge.node
                )}
                isLoading={loading}
                error={error}
                refetch={refetch}
                onPressItem={this.handleOnPress}
              />
            )}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Schedule;
