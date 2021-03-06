import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import handleLogin from '../handleLogin';
import { client } from '../../client'; //eslint-disable-line
import authenticateMutation from './authenticate';
import LoginForm from './Form';

const Login = ({ onLogin }) => (
  <Mutation
    mutation={authenticateMutation}
    update={(cache, { data: { authenticate } }) => {
      client.mutate({
        mutation: handleLogin,
        variables: {
          authToken: authenticate.token,
        },
      });
    }}
  >
    {(authenticate) => (
      <Formik
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Email is required!'),
          password: Yup.string().required('Password is required!'),
        })}
        onSubmit={async (variables, { setSubmitting, setFieldError }) => {
          try {
            await authenticate({ variables });
            if (onLogin) onLogin();
          } catch (e) {
            const { graphQLErrors } = e;
            console.log({ e });
            if (
              graphQLErrors.length &&
              graphQLErrors.find(
                ({ extensions }) => extensions.code === 'UNAUTHENTICATED'
              )
            ) {
              setFieldError('email', true);
              setFieldError('password', 'Your email or password is incorrect.');
            } else {
              setFieldError(
                'password',
                'Please make sure you enter in the correct email and password.'
              );
            }
          }
          setSubmitting(false);
        }}
      >
        {(formikBag) => <LoginForm {...formikBag} />}
      </Formik>
    )}
  </Mutation>
);

Login.propTypes = {
  onLogin: PropTypes.func,
};

export default Login;
