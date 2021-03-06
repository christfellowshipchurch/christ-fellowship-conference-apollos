import React, { Component } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  PaddedView,
  H4,
  UIText,
  HorizontalTileFeed,
  styled,
  ButtonLink,
  withIsLoading,
  TouchableScale,
} from '@apollosproject/ui-kit';

import ContentCard from 'apolloschurchapp/src/ui/ContentCardConnected';

const RowHeader = styled({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 0,
})(PaddedView);

const Name = styled({
  flexGrow: 1,
})(View);

const LikedContentLink = styled({
  flexDirection: 'row-reverse',
})(View);

class RecentlyLikedTileFeed extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
    isLoading: PropTypes.bool,
    name: PropTypes.string,
    content: PropTypes.arrayOf(
      PropTypes.any // this component doesn't care about the shape of `node`, just that it exists
    ),
  };

  loadingStateObject = {
    id: 'fake_id',
    title: '',
    coverImage: [],
  };

  titleImageItem = ({ item }) => (
    <TouchableScale
      onPress={() => {
        this.props.navigation.push('ContentSingle', {
          itemId: item.id,
        });
      }}
    >
      <ContentCard
        isLoading={item.isLoading}
        tile
        contentId={item.id}
        inHorizontalList
      />
    </TouchableScale>
  );

  render() {
    const { isLoading, name, navigation, content = [] } = this.props;

    return (
      <PaddedView horizontal={false}>
        <RowHeader>
          <Name>
            <H4 isLoading={isLoading}>{name}</H4>
          </Name>
          <LikedContentLink>
            <UIText isLoading={isLoading}>
              <ButtonLink
                onPress={() => {
                  navigation.navigate('LikedContentList');
                }}
              >
                View All
              </ButtonLink>
            </UIText>
          </LikedContentLink>
        </RowHeader>
        <HorizontalTileFeed
          initialNumToRender={5}
          content={content}
          renderItem={this.titleImageItem}
          loadingStateObject={this.loadingStateObject}
          isLoading={isLoading}
        />
      </PaddedView>
    );
  }
}

export default withNavigation(withIsLoading(RecentlyLikedTileFeed));
