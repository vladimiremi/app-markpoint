import 'react-native-gesture-handler';
import React from 'react';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

import {View} from 'react-native';


export default function App() {

  return (
    <>
      <NavigationContainer>
  
          <Routes />
        
        
      </NavigationContainer>
    </>
    );
};

