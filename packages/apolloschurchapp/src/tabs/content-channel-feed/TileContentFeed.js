import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  PaddedView,
  H4,
  HorizontalTileFeed,
  styled,
  ButtonLink,
  TouchableScale,
} from '@apollosproject/ui-kit';

import ContentCardConnected from '../../ui/ContentCardConnected';

const RowHeader = styled({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: 0,
})(PaddedView);

const loadingStateObject = {
  id: 'fake_id',
  title: '',
  coverImage: [],
};

const TileContentFeed = ({ isLoading, id, name, navigation, content = [] }) => (
  <PaddedView horizontal={false}>
    <RowHeader>
      <H4 isLoading={isLoading}>{name}</H4>
      {!isLoading ? (
        <ButtonLink
          onPress={() => {
            navigation.navigate('ContentFeed', {
              itemId: id,
              itemTitle: name,
            });
          }}
        >
          View All
        </ButtonLink>
      ) : null}
    </RowHeader>
    <HorizontalTileFeed
      content={content}
      renderItem={({ item }) => (
        <TouchableScale
          onPress={() => {
            navigation.push('ContentSingle', {
              itemId: item.id,
            });
          }}
        >
          <ContentCardConnected
            contentId={item.id}
            isLoading={isLoading}
            tile
            inHorizontalList
          />
        </TouchableScale>
      )}
      loadingStateObject={loadingStateObject}
      isLoading={isLoading}
    />
  </PaddedView>
);

TileContentFeed.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  isLoading: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.any // this component doesn't care about the shape of `node`, just that it exists
  ),
};

export default withNavigation(TileContentFeed);
