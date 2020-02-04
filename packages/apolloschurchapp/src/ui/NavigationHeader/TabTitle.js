import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { styled, withTheme, H4 } from '@apollosproject/ui-kit';

const IconImage = require('./icon.png');

const TextContainer = styled(({ theme, nested }) => ({
    paddingLeft: theme.sizing.baseUnit,
    paddingRight: nested ? theme.sizing.baseUnit : 0,
}))(View);

const BackIcon = styled(({ theme, nested }) => ({
    color: theme.colors.primary,
}))(FontAwesome5.Button);

const TabTitle = ({
    title,
    scrollY,
    scrollDistance,
    maxFontSize,
    minFontSize,
    goBack,
    nested,
    theme,
}) => {
    const fontSize = scrollY.interpolate({
        inputRange: [0, scrollDistance],
        outputRange: [maxFontSize, minFontSize],
        extrapolate: 'clamp',
    });
    const opacity = scrollY.interpolate({
        inputRange: [0, scrollDistance],
        outputRange: [1, 0],
    });

    return (
        <TextContainer nested={nested}>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: nested ? 'center' : 'flex-start',
                }}
            >
                {nested && (
                    <>
                        <View style={{ flex: 1 }}>
                            <BackIcon
                                name={'angle-left'}
                                solid
                                size={26}
                                color={theme.colors.primary}
                                backgroundColor="transparent"
                                underlayColor="transparent"
                                onPress={goBack}
                            />
                        </View>

                        <View
                            style={{
                                flex: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <H4 style={{ fontWeight: 'bold' }}>{title}</H4>
                        </View>

                        <View style={{ flex: 1 }} />
                    </>
                )}

                {!nested && (
                    <>
                        <Animated.Image
                            source={IconImage}
                            resizeMode="cover"
                            style={{
                                height: fontSize,
                                width: fontSize,
                                marginRight: 5,
                            }}
                        />

                        <Animated.Text style={{ fontSize, fontWeight: 'bold' }}>
                            {title}
                        </Animated.Text>
                    </>
                )}
            </View>

            <Animated.View
                style={{
                    width: '100%',
                    backgroundColor: theme.colors.text.primary,
                    height: StyleSheet.hairlineWidth,
                    marginTop: 5,
                    opacity,
                }}
            />
        </TextContainer>
    );
};

TabTitle.propTypes = {
    title: PropTypes.string,
    scrollY: PropTypes.object,
    scrollDistance: PropTypes.number,
    minFontSize: PropTypes.number,
    maxFontSize: PropTypes.number,
    nested: PropTypes.bool,
    goBack: PropTypes.func,
};

TabTitle.defaultProps = {
    scrollY: new Animated.Value(0),
    scrollDistance: 200,
    minFontSize: 32,
    maxFontSize: 42,
    nested: false,
    goBack: () => null,
};

export default withTheme()(TabTitle);
