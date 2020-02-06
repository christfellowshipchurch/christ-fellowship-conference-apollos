import { Platform } from 'react-native';
import { createUploadLink } from 'apollo-upload-client';
import { createHttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import {
  APP_DATA_URL,
  APP_DATA_CDN_URL,
  ANDROID_URL,
} from 'react-native-dotenv';

import { split } from 'apollo-link';

let cdnUri = APP_DATA_CDN_URL;
let uri = APP_DATA_URL;

const androidUri = ANDROID_URL || '10.0.2.2';

// Android's emulator requires localhost network traffic to go through 10.0.2.2
if (Platform.OS === 'android') {
  uri = uri.replace('localhost', androidUri);
  cdnUri = cdnUri.replace('localhost', androidUri);
}

// console.log('Logging some URI: ', { uri, cdnUri });
console.log('Logging some URI: ', { uri });

export default split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'mutation';
  },
  createUploadLink({ uri }),
  createHttpLink({
    uri: cdnUri,
    useGETForQueries: true,
  })
);
