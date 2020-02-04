import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styled } from '@apollosproject/ui-kit';
import { Image } from 'react-native';
import NavigationService from '../NavigationService';
import HeaderRight from './HeaderRight';

const LogoTitle = styled(({ theme }) => ({
  width: '100%',
  height: '40%',
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

export default {
  headerTitle: <LogoTitle source={require('./wordmark.png')} />,
  headerRight: <HeaderRight />,
  headerStyle: {
    backgroundColor: '#F3F3F3',
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
  },
};
