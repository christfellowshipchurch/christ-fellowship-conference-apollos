import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styled } from '@apollosproject/ui-kit';
import { Image } from 'react-native';
import NavigationService from '../NavigationService';

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

export default {
  headerTitle: <LogoTitle source={require('./wordmark.png')} />,
  headerRight: (
    <FontAwesome5.Button
      name={'user-circle'}
      solid
      size={26}
      color="#00aeef"
      backgroundColor="transparent"
      underlayColor="transparent"
      onPress={() => {
        NavigationService.navigate('Connect');
      }}
    />
  ),
  headerStyle: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'transparent',
  },
};
