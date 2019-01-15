import { AppRegistry, YellowBox } from 'react-native';

import App from './src';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'You should only render one navigator',
]);

AppRegistry.registerComponent('apolloschurchapp', () => App);
