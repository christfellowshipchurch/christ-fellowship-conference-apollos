import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { styled, H2 } from '@apollosproject/ui-kit';

const TextContainer = styled(({ theme }) => ({
    paddingLeft: theme.sizing.baseUnit,
    paddingRight: theme.sizing.baseUnit * 3,
}))(View);

const Separator = styled(({ theme }) => ({
    width: '75%',
    backgroundColor: theme.colors.darkPrimary,
    height: StyleSheet.hairlineWidth,
    marginVertical: theme.sizing.baseUnit * 0.5,
}))(View);

const TabTitle = ({
    children,
    scrollY,
    scrollDistance,
    maxFontSize,
    minFontSize,
}) => {
    const fontSize = scrollY.interpolate({
        inputRange: [0, scrollDistance],
        outputRange: [maxFontSize, minFontSize],
        extrapolate: 'clamp',
    });

    return (
        <TextContainer>
            <Animated.Text style={{ fontSize, fontWeight: 'bold' }}>
                {children}
            </Animated.Text>
            <Separator />
        </TextContainer>
    );
};

TabTitle.propTypes = {
    children: PropTypes.string,
    scrollY: PropTypes.object,
    scrollDistance: PropTypes.number,
    minFontSize: PropTypes.number,
    maxFontSize: PropTypes.number,
};

TabTitle.defaultProps = {
    scrollY: new Animated.Value(0),
    scrollDistance: 200,
    minFontSize: 16,
    maxFontSize: 32,
};

export default TabTitle;
