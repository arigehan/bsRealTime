import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useState, useEffect } from 'react';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import { TouchableOpacity, StyleSheet, Platform, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const useProxy = Platform.select({ web: false, default: true });

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
  revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
};

export default function FitbitAuth({ navigation }) {

  const [accessToken, setAccessToken] = useState();

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '238GXN',
      scopes: ['activity', 'sleep'],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        useProxy,
        scheme: 'daia'
        }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);
  

  function navToDexcom() {
    navigation.navigate('ConnectDexcom', {accessToken: accessToken});
  }
  
    function saveValues() {
  
      AsyncStorage.setItem('accessToken', JSON.stringify(accessToken))
      .catch((e) => {
        console.log('Error: ' + JSON.stringify(e));
      })
  
      navToDexcom();
    }

  return (
    <View style={styles.container}>
      
      <Text/>
      <Text/>
      <Text/>
      <Text/>
      <Text/>
      <Text/>
      <Text/>
      <Text/>
      <Image
        style ={{width: '62%', height: '8%'}}
        source = {require('../assets/Fitbit_logo.svg.png')}
      />
      <Text/>
      <Text/>
      <Text/>
      <Text/>
      <Text/>
      <Text style={styles.titleText}>Step One (of Two):</Text>
      <Text style={styles.titleText}>Connect Your Sleep Data</Text>
      <Text/>
      <Text style={styles.text}>All you need to do is log in to your Fitbit account.</Text>
      <Text/>
      <Text/>

      <TouchableOpacity style={styles.button} onPress={accessToken ? saveValues : () => { promptAsync({ useProxy }) }}>
        <Text style={styles.buttonText}>{accessToken ? 'Continue' : 'Login'}</Text>
      </TouchableOpacity>

      <Text/>
      <Text style={styles.text}>{ response ? (accessToken ? 'Login Successful' : 'Login Failed, Try Again') : ' ' }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black'
  },
  buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center'
  },
  titleText: {
    fontSize: 30,
    lineHeight: 33,
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: 'black',
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'black',
  }
});

