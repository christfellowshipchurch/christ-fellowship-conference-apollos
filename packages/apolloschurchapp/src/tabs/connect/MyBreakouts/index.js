import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Query } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { get } from 'lodash';
import Color from 'color';

import {
  H3,
  FlexedView,
  TouchableScale,
  styled,
  Button,
  FeedView,
} from '@apollosproject/ui-kit';
import ContentCardConnected from '../../../ui/ContentCardConnected';
import { ThinCard } from '../../../ui/Cards';
import { WebBrowserConsumer } from '../../../ui/WebBrowser';

import { MY_BREAKOUTS, BREAKOUTS_SIGN_UP_URL } from './queries';

const Title = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  paddingBottom: theme.sizing.baseUnit * 0.25,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderColor: theme.colors.darkPrimary,
}))(H3);

const BreakoutSessionTitle = styled(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.colors.text.secondary,
  fontSize: 16,
  paddingLeft: theme.sizing.baseUnit,
  marginBottom: -5,
}))(Text);

const BreakoutContainer = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit * 0.5,
}))(FlexedView);

const BreakoutSignUpButton = styled(({ theme }) => ({
  marginHorizontal: theme.sizing.baseUnit,
}))(Button);

const BreakoutReloadButton = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit * 0.5,
  marginHorizontal: theme.sizing.baseUnit,
  padding: theme.sizing.baseUnit * 0.5,
  alignItems: 'center',
}))(TouchableScale);

const loadingTheme = { colors: { primary: 'rgba(0, 0, 0, 0.35)' } };

const BreakoutCard = ({ id, times, ...props }) => (
  <BreakoutContainer>
    <BreakoutSessionTitle>{get(times, '[0].value')}</BreakoutSessionTitle>
    <ContentCardConnected contentId={id} card={ThinCard} {...props} />
  </BreakoutContainer>
);

const MyBreakoutList = ({ navigation, breakouts, loading }) =>
  loading ? (
    <BreakoutContainer>
      <ThinCard isLoading theme={loadingTheme} />
      <ThinCard isLoading theme={loadingTheme} />
      <ThinCard isLoading theme={loadingTheme} />
    </BreakoutContainer>
  ) : (
      <FlexedView>
        <Title>My Breakouts</Title>
        <FeedView
          ListItemComponent={BreakoutCard}
          content={breakouts}
          isLoading={loading}
          onPressItem={({ id, theme }) =>
            navigation.push('ContentSingle', {
              itemId: id,
              headerTitle: 'My Breakouts',
              theme: {
                colors: {
                  primary: 'white',
                  text: {
                    primary: Color('white').fade(0.25),
                  },
                  background: {
                    paper: get(theme, 'colors.primary', 'white'),
                  },
                },
              },
            })
          }
        />
      </FlexedView>
    );

MyBreakoutList.propTypes = {
  breakouts: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  navigation: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const MyBreakoutSignUp = ({ isLoading }) => (
  <Query query={BREAKOUTS_SIGN_UP_URL} fetchPolicy="network-only">
    {({ loading, data }) => (
      <WebBrowserConsumer>
        {(openUrl) => (
          <BreakoutSignUpButton
            isLoading={loading || isLoading}
            title="Select Breakouts"
            onPress={() => openUrl(data.breakoutSignUpUrl)}
          />
        )}
      </WebBrowserConsumer>
    )}
  </Query>
);

const MyBreakouts = ({ navigation }) => (
  <Query query={MY_BREAKOUTS} fetchPolicy="network-only">
    {({ loading, data, refetch }) => {
      if (loading) return <ActivityIndicator />;
      const myBreakouts = get(data, 'myBreakouts', []);

      return myBreakouts.length ? (
        <MyBreakoutList
          navigation={navigation}
          loading={loading}
          breakouts={myBreakouts}
        />
      ) : (
          <FlexedView>
            <MyBreakoutSignUp isLoading={loading} />
            <BreakoutReloadButton onPress={() => refetch()}>
              <Text>Reload Breakouts</Text>
            </BreakoutReloadButton>
          </FlexedView>
        );
    }}
  </Query>
);

export default withNavigation(MyBreakouts);
