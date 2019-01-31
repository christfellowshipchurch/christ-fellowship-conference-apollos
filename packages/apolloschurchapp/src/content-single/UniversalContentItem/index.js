import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  styled,
  GradientOverlayImage,
  PaddedView,
  H3,
} from '@apollosproject/ui-kit';
import MediaControls from '../MediaControls';
import HTMLContent from '../HTMLContent';
import HorizontalContentFeed from '../HorizontalContentFeed';
import BackgroundView from '../../ui/BackgroundView';

const FlexedScrollView = styled({ flex: 1 })(ScrollView);

const PaddedH3 = styled(({ theme }) => ({
  marginTop: '5%',
  marginBottom: '5%',
}))(H3);

const UniversalContentItem = ({ content, loading, navigation }) => {
  const coverImageSources = get(content, 'coverImage.sources', []);
  if (content.title && navigation.state.params.title !== content.title)
    navigation.setParams({ title: content.title });
  return (
    <FlexedScrollView>
      {coverImageSources.length || loading ? (
        <GradientOverlayImage
          isLoading={!coverImageSources.length && loading}
          source={coverImageSources}
        />
      ) : null}
      <SafeAreaView>
        <BackgroundView colors={['white', 'white']}>
          <MediaControls contentId={content.id} />
          <PaddedView>
            <PaddedH3 padded isLoading={!content.title && loading}>
              {content.title}
            </PaddedH3>
            <HTMLContent contentId={content.id} />
          </PaddedView>
          <HorizontalContentFeed contentId={content.id} />
        </BackgroundView>
      </SafeAreaView>
    </FlexedScrollView>
  );
};

UniversalContentItem.propTypes = {
  content: PropTypes.shape({
    __typename: PropTypes.string,
    parentChannel: PropTypes.shape({
      name: PropTypes.string,
    }),
    id: PropTypes.string,
    htmlContent: PropTypes.string,
    title: PropTypes.string,
    scriptures: PropTypes.arrayOf(
      PropTypes.shape({
        /** The ID of the verse (i.e. '1CO.15.57') */
        id: PropTypes.string,
        /** A human readable reference (i.e. '1 Corinthians 15:57') */
        reference: PropTypes.string,
        /** The scripture source to render */
        html: PropTypes.string,
      })
    ),
  }),
  loading: PropTypes.bool,
};

export default UniversalContentItem;
