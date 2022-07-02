// ios client id: 
// 79485309173-tq4rnq6g8vllhguh52grdh2anu7dftq3.apps.googleusercontent.com

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import sugarGraph from './screens/sugarGraph';
import googleAuth from './screens/googleAuth';
import connectNS from './screens/connectNS';
import settings from './screens/settings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="GoogleAuth">
          <Stack.Screen name="GoogleAuth" component={googleAuth} />
          <Stack.Screen name="ConnectNS" component={connectNS} />
          <Stack.Screen name="SugarGraph" component={sugarGraph} />
          <Stack.Screen name="Settings" component={settings} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}