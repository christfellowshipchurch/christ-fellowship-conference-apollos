import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { Query } from 'react-apollo';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  FeedView,
  styled,
  ContentCard,
  BackgroundView,
} from '@apollosproject/ui-kit';

import ContentCardConnected from '../../ui/ContentCardConnected';
import { ThinCard } from '../../ui/Cards';
import NavigationHeader from '../../ui/NavigationHeader';

import getUserFeed from './getUserFeed';

const FeedViewContainer = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit,
  height: '100%',
}))(View);

const Header = styled(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.colors.text.secondary,
  fontSize: 16,
  paddingLeft: theme.sizing.baseUnit,
  marginBottom: -5,
}))(Text);

const ListCardContainer = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit,
}))(View);

const ListCard = ({ expand, sectionHeader, ...props }) => (
  <ListCardContainer>
    {!!sectionHeader && <Header>{sectionHeader}</Header>}
    <ContentCardConnected {...props} card={expand ? ContentCard : ThinCard} />
  </ListCardContainer>
);

class Home extends PureComponent {
  static navigationOptions = {
    header: <NavigationHeader title="Home" />,
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
      headerTitle: 'Home',
    });

  handleProfilePress = (item) =>
    this.props.navigation.navigate('Connect', {
      transitionKey: item.transitionKey,
    });

  render() {
    return (
      <BackgroundView>
        <SafeAreaView>
          <Query query={getUserFeed} fetchPolicy="cache-and-network">
            {({ loading, error, data, refetch }) => {
              const nodes = get(data, 'userFeed.edges', []);
              const comingUp = 'Coming Up Next';
              const happeningNow = 'Happening Now';

              return (
                <FeedViewContainer>
                  <FeedView
                    ListItemComponent={ListCard}
                    content={nodes.map((edge, i) => ({
                      ...edge.node,
                      expand: nodes.length === 1 || i > 0,
                      sectionHeader:
                        nodes.length <= 1
                          ? null
                          : i > 0
                            ? comingUp
                            : happeningNow,
                    }))}
                    isLoading={loading}
                    error={error}
                    refetch={refetch}
                    onPressItem={this.handleOnPress}
                  />
                </FeedViewContainer>
              );
            }}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Home;
