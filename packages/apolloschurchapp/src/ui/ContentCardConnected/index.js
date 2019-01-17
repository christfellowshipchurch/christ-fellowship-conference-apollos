import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import { ContentCard, ErrorCard } from '@apollosproject/ui-kit';
import getContentCard from './query';

export { tileCardFragment, largeCardFragment } from './query';

const ContentCardConnected = ({
  contentId,
  isLoading,
  tile,
  ...otherProps
}) => {
  if (!contentId || isLoading) return null;

  return (
    <Query query={getContentCard} variables={{ contentId, tile: !!tile }}>
      {({ data: { node = {} } = {}, loading, error }) => {
        console.log(error, 'content card error');
        if (error) return <ErrorCard error={error} />;

        const coverImage = get(node, 'coverImage.sources', undefined);
        console.log(node);
        return (
          <ContentCard
            {...node}
            {...otherProps}
            coverImage={coverImage}
            tile={tile}
            isLoading={loading}
          />
        );
      }}
    </Query>
  );
};

ContentCardConnected.propTypes = {
  isLoading: PropTypes.bool,
  contentId: PropTypes.string,
  tile: PropTypes.bool,
};

export default ContentCardConnected;
