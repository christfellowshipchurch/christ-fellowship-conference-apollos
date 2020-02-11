import { AppRegistry, YellowBox } from 'react-native';
import { Client } from 'bugsnag-react-native';

// import { BUGSNAG_API_KEY } from './src/config';
import App from './src';

// eslint-disable-next-line no-unused-vars
// const bugsnag = new Client(BUGSNAG_API_KEY);

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'You should only render one navigator',
]);

AppRegistry.registerComponent('apolloschurchapp', () => App);
