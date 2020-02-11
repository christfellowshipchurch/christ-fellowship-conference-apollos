import React, { PureComponent } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { get } from 'lodash';

import { track, events } from 'apolloschurchapp/src/analytics';
import { WebBrowserConsumer } from 'apolloschurchapp/src/ui/WebBrowser';
import {
  FlexedView,
  PaddedView,
  TextInput,
  Button,
  ButtonLink,
  styled,
} from '@apollosproject/ui-kit';

const BottomSafeAreaView = styled({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
})(SafeAreaView);

class Form extends PureComponent {
  static propTypes = {
    setFieldValue: PropTypes.func,
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    values: PropTypes.shape({}),
    handleSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
  };

  render() {
    const {
      values,
      errors,
      handleSubmit,
      setFieldValue,
      isValid,
      isSubmitting,
    } = this.props;
    return (
      <FlexedView>
        <KeyboardAwareScrollView>
          <PaddedView>
            <View>
              <TextInput
                label="Email"
                type="email"
                value={values.email}
                error={errors.email}
                onChangeText={(text) => setFieldValue('email', text)}
                onSubmitEditing={() => this.passwordInput.focus()}
                returnKeyType="next"
                textContentType="username"
                enablesReturnKeyAutomatically
              />
              <TextInput
                label="Password"
                type="password"
                value={values.password}
                error={errors.password}
                onChangeText={(text) => setFieldValue('password', text)}
                onSubmitEditing={handleSubmit}
                returnKeyType="go"
                textContentType="password"
                enablesReturnKeyAutomatically
                inputRef={(r) => {
                  this.passwordInput = r;
                }}
              />
              <ForgotPassword />
            </View>
          </PaddedView>
        </KeyboardAwareScrollView>
        <BottomSafeAreaView>
          <PaddedView vertical={false}>
            <Button
              onPress={handleSubmit}
              title="Sign in"
              disabled={!isValid}
              loading={isSubmitting}
            />
          </PaddedView>
        </BottomSafeAreaView>
      </FlexedView>
    );
  }
}

const PASSWORD_REST_URL = gql`
  query passwordResetUrl {
    passwordResetUrl
  }
`;

const ForgotPassword = () => (
  <Query query={PASSWORD_REST_URL} fetchPolicy="network-only">
    {({ data, loading }) =>
      loading ? (
        <ButtonLink isLoading>Forgot your password?</ButtonLink>
      ) : (
          <WebBrowserConsumer>
            {(openUrl) => (
              <ButtonLink
                onPress={() => {
                  track({ eventName: events.UserForgotPassword });
                  return openUrl(get(data, 'passwordResetUrl', ''));
                }}
              >
                Forgot your password?
            </ButtonLink>
            )}
          </WebBrowserConsumer>
        )
    }
  </Query>
);

export default Form;
