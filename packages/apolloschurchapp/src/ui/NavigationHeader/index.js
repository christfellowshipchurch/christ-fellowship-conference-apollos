import React, { Component } from 'react';
import { View, Animated, Image } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import { get } from 'lodash';

import { styled, ThemeMixin } from '@apollosproject/ui-kit';

import TabTitle from './TabTitle';
import HeaderRight from './HeaderRight';

const FlexedView = styled(({ theme, flex = 1 }) => ({
    flex,
    marginTop: theme.sizing.baseUnit * 0.5,
}))(View);

const NavigationContainer = styled(({ theme }) => ({
    backgroundColor: theme.colors.background.paper,
}))(View);

const NavigationHeader = ({ scrollY, title, nested, goBack, theme }) => (
    <ThemeMixin
        mixin={{
            type: get(theme, 'type', 'light').toLowerCase(),
            colors: get(theme, 'colors'),
        }}
    >
        <NavigationContainer>
            <SafeAreaView inset={{ top: 'always', bottom: 'never' }}>
                <FlexedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FlexedView flex={3}>
                        <TabTitle
                            title={title}
                            scrollY={scrollY}
                            nested={nested}
                            goBack={goBack}
                        />
                    </FlexedView>

                    {!nested && (
                        <FlexedView flex={1}>
                            <HeaderRight />
                        </FlexedView>
                    )}
                </FlexedView>
            </SafeAreaView>
        </NavigationContainer>
    </ThemeMixin>
);

NavigationHeader.propTypes = {
    scrollY: PropTypes.object,
    title: PropTypes.string,
    nested: PropTypes.bool,
    goBack: PropTypes.func,
    theme: PropTypes.object,
};

NavigationHeader.defaultProps = {
    scrollY: new Animated.Value(0),
    title: null,
    nested: false,
    goBack: () => null,
};

export default NavigationHeader;
