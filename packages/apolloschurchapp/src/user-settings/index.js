import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

import {
  PaddedView,
  TableView,
  Cell,
  CellIcon,
  CellText,
  Divider,
  Touchable,
  styled,
  ActivityIndicator,
} from '@apollosproject/ui-kit';
import { WebBrowserConsumer } from 'apolloschurchapp/src/ui/WebBrowser';
import AvatarForm from 'apolloschurchapp/src/ui/UserAvatarView/AvatarForm';
import BackgroundView from '../ui/BackgroundView';
import NavigationHeader from '../ui/NavigationHeader';

import getLoginState from '../auth/getLoginState';
import logout from '../auth/logout';

const AvatarView = styled({
  alignItems: 'center',
  justifyContent: 'center',
})(PaddedView);

const BackgroundContainer = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 1.75,
}))(BackgroundView);

class UserSettings extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <NavigationHeader
        nested
        title="Settings"
        goBack={() => navigation.goBack(null)}
      />
    ),
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  render() {
    return (
      <Query query={getLoginState} fetchPolicy="cache-and-network">
        {({ data: { isLoggedIn = false, loading } }) => {
          if (loading) return <ActivityIndicator />;
          if (!isLoggedIn) return null;
          return (
            <BackgroundContainer colors={['white', 'white']}>
              <AvatarView>
                <AvatarForm
                  text
                  refetch={this.props.navigation.getParam('refetch', {})}
                />
              </AvatarView>
              <WebBrowserConsumer>
                {(openUrl) => (
                  <BackgroundView>
                    <TableView>
                      <Touchable
                        onPress={async () => {
                          await this.props.navigation.navigate(
                            'PersonalDetails'
                          );
                        }}
                      >
                        <Cell>
                          <CellText>Change Personal Details</CellText>
                          <CellIcon name="arrow-next" />
                        </Cell>
                      </Touchable>
                      <Divider />
                      <Touchable
                        onPress={async () => {
                          await this.props.navigation.navigate(
                            'ChangePassword'
                          );
                        }}
                      >
                        <Cell>
                          <CellText>Change Password</CellText>
                          <CellIcon name="arrow-next" />
                        </Cell>
                      </Touchable>
                    </TableView>

                    <TableView>
                      <Mutation mutation={logout}>
                        {(handleLogout) => (
                          <Touchable
                            onPress={async () => {
                              await handleLogout();
                              await this.props.navigation.navigate('Connect');
                            }}
                          >
                            <Cell>
                              <CellText>Logout</CellText>
                              <CellIcon name="arrow-next" />
                            </Cell>
                          </Touchable>
                        )}
                      </Mutation>
                    </TableView>
                  </BackgroundView>
                )}
              </WebBrowserConsumer>
            </BackgroundContainer>
          );
        }}
      </Query>
    );
  }
}

export default UserSettings;
