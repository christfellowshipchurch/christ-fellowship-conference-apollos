import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { get } from 'lodash';
import Color from 'color';

import {
    Card,
    H3,
    H4,
    UIText,
    ConnectedImage,
    FlexedView,
    styled,
    ThemeMixin,
    withTheme,
} from '@apollosproject/ui-kit';

const CardImage = styled({
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
})(ConnectedImage);

const CardContent = styled(({ theme }) => ({
    flex: 3,
    paddingHorizontal: theme.sizing.baseUnit * 0.75,
    paddingTop: theme.sizing.baseUnit,
    paddingBottom: theme.sizing.baseUnit,
}))(View);

const ImageSourceType = PropTypes.oneOfType([
    PropTypes.shape({
        uri: PropTypes.string,
        label: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
    }),
    PropTypes.string,
]);

const CardWrapper = styled(({ theme }) => ({
    flexDirection: 'row',
}))(FlexedView);

const ImageContainer = styled(({ theme }) => ({
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
}))(FlexedView);

const Icon = withTheme(({ theme, name }) => ({
    size: 26,
    color: theme.colors.white,
    icon: name,
}))(FontAwesome5);

const ThinCard = ({ title, summary, isLoading, coverImage, icon, theme }) => (
    <ThemeMixin
        mixin={{
            type: get(theme, 'type', 'light').toLowerCase(),
            colors: get(theme, 'colors', { primary: '#00aeef' }),
        }}
    >
        <Card>
            <CardWrapper>
                <ImageContainer>
                    {!!coverImage && <CardImage source={coverImage} numberOfLines={1} />}

                    {!coverImage &&
                        !!icon &&
                        icon !== '' && <Icon name={icon} color="white" size={26} />}
                </ImageContainer>

                <CardContent>
                    <H4 isLoading={isLoading}>{title}</H4>
                    {!!summary && (
                        <UIText numberOfLines={1} style={{ flex: 1 }}>
                            {summary}
                        </UIText>
                    )}
                </CardContent>
            </CardWrapper>
        </Card>
    </ThemeMixin>
);

ThinCard.propTypes = {
    title: PropTypes.string,
    summary: PropTypes.string,
    isLoading: PropTypes.bool,
    coverImage: PropTypes.oneOfType([
        PropTypes.arrayOf(ImageSourceType),
        ImageSourceType,
    ]),
    icon: PropTypes.string,
    theme: PropTypes.object,
};

ThinCard.defaultProps = {
    isLoading: false,
    theme: {},
};

export default ThinCard;
