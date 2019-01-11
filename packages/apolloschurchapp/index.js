import { AppRegistry, YellowBox } from 'react-native';
import { Client } from 'bugsnag-react-native';

import { BUGSNAG_API_KEY } from './src/config'
import App from './src';

const bugsnag = new Client(BUGSNAG_API_KEY);

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

AppRegistry.registerComponent('apolloschurchapp', () => App);
