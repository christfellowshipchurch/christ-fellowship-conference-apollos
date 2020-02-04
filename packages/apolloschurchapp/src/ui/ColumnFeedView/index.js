import React, { PureComponent } from 'react';
import { Animated, View, Dimensions, Platform } from 'react-native';
import { Query } from 'react-apollo';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
    FeedView,
    BackgroundView,
    styled,
    withTheme,
    H3,
    CardTile,
    Card,
} from '@apollosproject/ui-kit';

const dummyData = {
    id: 'ContentItem:0',
    title: 'Title',
    htmlContent: 'This is the html content',
};

const deviceWidth = Dimensions.get('screen').width;

const ColumnCardWrapper = styled(
    ({ theme, columns, cardColor, forceRatio }) => ({
        flex: 1,
        flexDirection: 'column',

        // Sizing
        width: deviceWidth / columns - theme.sizing.baseUnit * 1.5,
        margin: theme.sizing.baseUnit * 0.5,

        // Base Card Styles
        backgroundColor: cardColor || theme.colors.background.paper || undefined, // bail out if no bg color
        borderRadius: theme.sizing.baseUnit,
        ...Platform.select(theme.shadows.default),
        ...(forceRatio ? { aspectRatio: forceRatio } : {}),
    })
)(View);

const Content = styled(({ theme, columns, cardColor, forceRatio }) => ({
    // Spacing
    paddingHorizontal: theme.sizing.baseUnit * 0.5,
    paddingBottom: theme.sizing.baseUnit * 0.25,
    paddingTop: theme.sizing.baseUnit * 1.5,
    // backgroundColor: 'red',

    // Content Alignment
    justifyContent: 'flex-end',
}))(View);

const BorderBottom = styled(({ theme, columns, cardColor, forceRatio }) => ({
    // Placement
    alignSelf: 'flex-end',

    // Sizing
    width: '100%',
    height: theme.sizing.baseUnit * 1.5,

    // Color
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: theme.sizing.baseUnit,
    borderBottomLeftRadius: theme.sizing.baseUnit,
}))(View);

const ColumnCard = ({ title, columns, isLoading }) => (
    <ColumnCardWrapper columns={columns}>
        <Content>
            <H3 isLoading={isLoading}>{title}</H3>
        </Content>

        <BorderBottom />
    </ColumnCardWrapper>
);

const FeedViewContainer = styled(({ theme }) => ({
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: theme.sizing.baseUnit * 0.5,
}))(View);

const ColumnFeedView = ({ columns, content, isLoading, ...props }) => (
    <FeedViewContainer>
        <FeedView
            numColumns={columns}
            columnWrapperStyle={
                columns > 1 && {
                    flex: 1,
                    justifyContent: 'space-between',
                    alignContent: 'space-between',
                    alignItems: 'stretch',
                }
            }
            ListItemComponent={ColumnCard}
            content={content.map((n) => ({
                ...n,
                columns: 2,
                isLoading,
            }))}
            isLoading={isLoading}
            onPressItem={() => null}
            {...props}
        />
    </FeedViewContainer>
);

ColumnFeedView.propTypes = {
    columns: PropTypes.number,
};

ColumnFeedView.defaultProps = {
    columns: 2,
};

export default ColumnFeedView;
