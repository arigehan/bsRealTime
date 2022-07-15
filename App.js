import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import sugarGraph from './screens/sugarGraph';
import logoWelcome from './screens/logoWelcome';
import connectDexcom from './screens/connectDexcom';
import settings from './screens/settings';
import fitbitAuth from './screens/fitbitAuth';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="LogoWelcome">
          <Stack.Screen name="LogoWelcome" component={logoWelcome} />
          <Stack.Screen name="FitbitAuth" component={fitbitAuth} />
          <Stack.Screen name="ConnectDexcom" component={connectDexcom} />
          <Stack.Screen name="SugarGraph" component={sugarGraph} />
          <Stack.Screen name="Settings" component={settings} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}