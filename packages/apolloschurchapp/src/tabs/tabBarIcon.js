import React from 'react';
import PropTypes from 'prop-types';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const tabBarIcon = (name) => {
  function TabBarIcon({ tintColor }) {
    return <FontAwesome5 name={name} color={tintColor} size={20} />;
  }
  TabBarIcon.propTypes = {
    tintColor: PropTypes.string,
  };
  return TabBarIcon;
};

export default tabBarIcon;
