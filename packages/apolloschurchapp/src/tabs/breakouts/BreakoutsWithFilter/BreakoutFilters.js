import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { FeedView } from '@apollosproject/ui-kit';

import { ThinCard } from '../../../ui/Cards';
import ContentCardConnected from '../../../ui/ContentCardConnected';
import { GET_BREAKOUT_FILTERS } from './queries';

const Card = (item) => <ContentCardConnected {...item} card={ThinCard} />;

class BreakoutsByFilter extends PureComponent {
    static propTypes = {
        onScroll: PropTypes.func,
        onPressItem: PropTypes.func,
        filter: PropTypes.oneOf(['TIMES', 'CATEGORIES']),
    };

    static defaultProps = {
        filter: 'TIMES',
    };

    handleOnPress = (item) =>
        this.props.navigation.navigate('ContentSingle', {
            itemId: item.id,
            transitionKey: item.transitionKey.toUpperCase(),
        });

    render() {
        return (
            <Query
                query={GET_BREAKOUT_FILTERS}
                variables={{ filter: this.props.filter }}
                fetchPolicy="cache-and-network"
            >
                {({ loading, error, data, refetch }) => (
                    <FeedView
                        ListItemComponent={Card}
                        content={get(data, 'breakoutFilters', []).map(
                            ({ value, ...props }) => ({
                                title: value,
                                ...props,
                            })
                        )}
                        isLoading={loading}
                        error={error}
                        onPressItem={this.props.onPressItem}
                        onScroll={this.props.onScroll}
                    />
                )}
            </Query>
        );
    }
}

export default BreakoutsByFilter;
