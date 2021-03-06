import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import SplashScreen from 'react-native-splash-screen';
import gql from 'graphql-tag';
import DeviceInfo from 'react-native-device-info';

import { resolvers, schema, defaults } from '../store';
import httpLink from './httpLink';
import clientStateLink from './clientStateLink';
import authLink from './authLink'; // eslint-disable-line
import cache, { ensureCacheHydration } from './cache';

const link = clientStateLink.concat(ApolloLink.from([authLink, httpLink]));
const wipeData = () => cache.writeData({ data: defaults });

let clearStore;

export const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: true,
  shouldBatch: true,
  resolvers,
  typeDefs: schema,
  name: DeviceInfo.getApplicationName(),
  version: DeviceInfo.getVersion(),
});

// Hack to give auth link access to method on client;
// eslint-disable-next-line prefer-destructuring
clearStore = client.clearStore;

wipeData();
// Ensure that media player still works after logout.
client.onClearStore(() => wipeData());

client.onResetStore(clientStateLink.writeDefaults);

export const CACHE_LOADED = gql`
  query {
    cacheLoaded @client
  }
`;

export const MARK_CACHE_LOADED = gql`
  mutation markCacheLoaded {
    cacheMarkLoaded @client
  }
`;

class ClientProvider extends PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      cache: PropTypes.shape({}),
    }),
  };

  static defaultProps = {
    client,
  };

  async componentDidMount() {
    try {
      await ensureCacheHydration;
    } catch (e) {
      throw e;
    } finally {
      if (SplashScreen && SplashScreen.hide) SplashScreen.hide();
      client.mutate({ mutation: MARK_CACHE_LOADED });
    }
  }

  render() {
    return <ApolloProvider {...this.props} client={client} />;
  }
}

export default ClientProvider;
