import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { get, filter } from 'lodash';
import PropTypes from 'prop-types';
import {
  styled,
  PaddedView,
  H3,
  H4,
  H6,
  FlexedView,
  withTheme,
  BackgroundView,
  UIText,
} from '@apollosproject/ui-kit';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Color from 'color';

import HTMLContent from '../HTMLContent';

const Title = styled(({ theme }) => ({
  color: theme.colors.white,
}))(H3);

const TitleContainer = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit * 0.5,
}))(View);

const HeaderContainer = styled(({ theme, isLoading }) => ({
  flexDirection: 'row',
  paddingHorizontal: theme.sizing.baseUnit,
  paddingVertical: theme.sizing.baseUnit * 2,
  backgroundColor: isLoading ? theme.colors.lightPrimary : theme.colors.primary,
}))(View);

const Icon = withTheme(({ theme, name }) => ({
  size: 36,
  color: theme.colors.white,
  icon: name,
  style: {
    paddingHorizontal: 0,
    paddingTop: theme.sizing.baseUnit * 1.5,
  },
}))(FontAwesome5);

const Label = styled(({ theme }) => ({
  color: Color(theme.colors.white).fade(0.25),
  fontWeight: 'bold',
  paddingLeft: theme.sizing.baseUnit * 0.5,
  textTransform: 'uppercase',
}))(UIText);

const TimeLabel = styled(({ theme }) => ({
  color: theme.colors.darkPrimary,
  marginBottom: theme.sizing.baseUnit * 0.5,
}))(H4);

const LabelPill = styled(({ theme }) => ({
  color: theme.colors.primary,
  marginBottom: theme.sizing.baseUnit * 0.5,
  fontWeight: 'bold',
  fontSize: theme.typography.baseFontSize,
}))(Text);

const Breakout = ({ content, loading }) => {
  const categories = get(content, 'categories', []);
  const times = filter(
    get(content, 'times', []),
    (time) => time && time !== ''
  );
  const location = get(content, 'location', '');

  return (
    <FlexedView>
      <HeaderContainer isLoading={loading}>
        <View>
          <Icon name={content.icon} />
        </View>

        <View style={{ flex: 1 }}>
          <Label>
            {categories.map(
              ({ value }, i) =>
                `${value}${i !== categories.length - 1 ? ',' : ''}`
            )}
          </Label>
          <TitleContainer>
            <Title isLoading={!content.title && loading}>{content.title}</Title>
          </TitleContainer>
        </View>
      </HeaderContainer>

      <BackgroundView>
        <ScrollView>
          <PaddedView>
            {!!content.summary &&
              content.summary !== '' && (
                <View>
                  <View>
                    <LabelPill>{content.summary}</LabelPill>
                  </View>
                </View>
              )}

            {!!times.length && <H6>Sessions:</H6>}
            {times.map(
              ({ value }) =>
                !!value && <TimeLabel key={value}>{value}</TimeLabel>
            )}

            {!!location &&
              location !== '' && (
                <>
                  <H6>Location:</H6>
                  <TimeLabel>{location}</TimeLabel>
                </>
              )}
            <HTMLContent contentId={content.id} />
          </PaddedView>
        </ScrollView>
      </BackgroundView>
    </FlexedView>
  );
};

Breakout.propTypes = {
  content: PropTypes.shape({
    __typename: PropTypes.string,
    id: PropTypes.string,
    htmlContent: PropTypes.string,
    title: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

export default Breakout;
