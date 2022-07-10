import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import { Button, StyleSheet, Platform, View, Text } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const useProxy = Platform.select({ web: false, default: true });

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
  revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
};

export default function fitbitAuth({ navigation }) {

  const [accessToken, setAccessToken] = React.useState();


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

  function showUserInfo() {
    if (response) {

        return (
            <View style={styles.userInfo}>
                <Text>Welcome, {accessToken}</Text>
            </View>
        );
    }
  }

  function navToSleep() {
    navigation.navigate('SleepDisplay', {
      accessToken: accessToken
    }); 
  }

  return (
    <View style={styles.container}>
    {showUserInfo()}
    <Button 
       title={response ? "Continue" : "Login"}
       onPress={response ? navToSleep : () => { promptAsync({ useProxy }) }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

