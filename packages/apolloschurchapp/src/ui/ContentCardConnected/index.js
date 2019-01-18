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
        if (error) console.log(error, 'content card error');
        if (error) return <ErrorCard error={error} />;
        const theme = {
          colors: {
            background: {
              accent: get(
                node,
                'theme.colors.primary',
                'rgba(165, 165, 165, 0.30000000000000004)'
              ),
            },
          },
        };
        const coverImage = get(node, 'coverImage.sources', undefined);
        return (
          <ContentCard
            {...node}
            {...otherProps}
            theme={theme}
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
