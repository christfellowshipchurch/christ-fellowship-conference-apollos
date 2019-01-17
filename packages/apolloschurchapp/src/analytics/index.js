import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Amplitude from 'amplitude';

const anonymousId = DeviceInfo.getUniqueID();

const amplitude = new Amplitude('4f3aa931b69cf74b41f0851b33fd00da');

const deviceInfo = {
  platform: Platform.OS === 'ios' ? 'iOS' : 'Android',
  deviceId: anonymousId,
  deviceModel: DeviceInfo.getModel(),
  osVersion: DeviceInfo.getSystemVersion(),
  appVersion: DeviceInfo.getVersion(),
};

export const track = ({ eventName, properties = {} }) =>
  amplitude.track({
    event_type: eventName,
    device_id: anonymousId,
    event_properties: properties,
    user_properties: {
      ...deviceInfo,
    },
  });

export const identify = () => amplitude.setUserId(anonymousId);

export const events = {
  LikeContent: 'Like Content',
  UnlikeContent: 'Unlike Content',
  ViewContent: 'View Content',
  ShareContent: 'Share Content',
  UserLogin: 'User Login',
  UserSignup: 'User Signup',
  UserLogout: 'UserLogout',
  UserForgotPassword: 'User Forgot Password',
  UserPlayedMedia: 'User Played Media',
};

export default {
  track,
  identify,
  events,
};
