import React, { PureComponent } from 'react';
import { Query, useQuery } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import Color from 'color';

import { FeedView, BackgroundView, FlexedView } from '@apollosproject/ui-kit';

import { ThinCard } from '../../ui/Cards';
import ContentCardConnected from '../../ui/ContentCardConnected';
import NavigationHeader from '../../ui/NavigationHeader';

import { BREAKOUTS_BY_FILTERS } from './BreakoutsWithFilter/queries';

const Card = (item) => <ContentCardConnected {...item} card={ThinCard} />;
const Loading = () => {
    const cards = [0, 1, 2, 3, 4, 5];

    return cards.map((n) => <ThinCard isLoading key={n} />);
};

class BreakoutsByFilter extends PureComponent {
    static propTypes = {
        onScroll: PropTypes.func,
        navigation: PropTypes.shape({
            getParam: PropTypes.func,
            setParams: PropTypes.func,
            navigate: PropTypes.func,
        }),
    };

    static defaultProps = {
        category: '',
        time: '',
    };

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;

        return {
            header: (
                <NavigationHeader
                    scrollY={params.scrollY}
                    title={navigation.getParam('title')}
                    nested
                    goBack={() => navigation.goBack(null)}
                />
            ),
        };
    };

    handleOnPress = (item) =>
        this.props.navigation.navigate('ContentSingle', {
            itemId: item.id,
            headerTitle: this.props.navigation.getParam('title'),
            theme: {
                colors: {
                    primary: 'white',
                    text: {
                        primary: Color('white').fade(0.25),
                    },
                    background: {
                        paper: get(item, 'theme.colors.primary', 'white'),
                    },
                },
            },
        });

    render() {
        const { navigation } = this.props;
        const { key, value } = navigation.getParam('filter');
        const variables = {};
        variables[key] = value;

        return (
            <BackgroundView>
                <Query
                    query={BREAKOUTS_BY_FILTERS}
                    variables={variables}
                    fetchPolicy="cache-and-network"
                >
                    {({ loading, error, data, refetch }) =>
                        loading ? (
                            <FlexedView>
                                <Loading />
                            </FlexedView>
                        ) : (
                                <FeedView
                                    ListItemComponent={Card}
                                    content={get(data, 'breakouts', [])}
                                    isLoading={loading}
                                    error={error}
                                    refetch={refetch}
                                    onPressItem={this.handleOnPress}
                                    onScroll={this.props.onScroll}
                                />
                            )
                    }
                </Query>
            </BackgroundView>
        );
    }
}

export default BreakoutsByFilter;
