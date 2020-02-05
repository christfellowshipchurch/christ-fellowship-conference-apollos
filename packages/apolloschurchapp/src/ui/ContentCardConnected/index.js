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
  card,
  ...otherProps
}) => {
  if (!contentId || isLoading) return null;

  return (
    <Query query={getContentCard} variables={{ contentId, tile: !!tile }}>
      {({ data: { node = {} } = {}, loading, error }) => {
        if (error) console.log(error, 'content card error');
        if (error) return <ErrorCard error={error} />;

        const coverImage = get(node, 'coverImage.sources', undefined);
        const theme = get(node, 'theme');

        return React.createElement(card, {
          ...node,
          ...otherProps,
          coverImage,
          theme,
          tile,
          isLoading: loading,
        });
      }}
    </Query>
  );
};

ContentCardConnected.propTypes = {
  isLoading: PropTypes.bool,
  contentId: PropTypes.string,
  tile: PropTypes.bool,
  card: PropTypes.func,
};

ContentCardConnected.defaultProps = {
  card: ContentCard,
};

export default ContentCardConnected;
