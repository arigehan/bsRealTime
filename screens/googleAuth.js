import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function googleAuth({ navigation }) {

  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    //androidClientId: " ", //Just remember, the andriod stuff is a bit messed up with this expo stuff 
    iosClientId: "79485309173-tq4rnq6g8vllhguh52grdh2anu7dftq3.apps.googleusercontent.com",
    expoClientId: "79485309173-jutqi66l6q5um7abflpsi4t2f0t4o1jr.apps.googleusercontent.com"
  })

  React.useEffect(() => {
    if (response?.type === "success") {
        setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}`}
    })

    userInfoResponse.json().then(data => {
        setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
        return (
            <View style={styles.userInfo}>
                <Image source={{ruri: userInfo.picture}} style={styles.profilePic} />
                <Text>Welcome, {userInfo.name}</Text>
                <Text>{userInfo.email}</Text>
            </View>
        );
    }
  }

  function navToSugar() {
    navigation.navigate('SugarGraph');
  }

  return (
    <View style={styles.container}>
        {showUserInfo()}
       <Button 
       title={accessToken ? (userInfo ? "Continue" : "Get User Data") : "Login"}
       onPress={accessToken ? (userInfo? navToSugar : getUserData) : () => { promptAsync({showInRecents: true}) }}
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
  },
  profilePic: {
    width: 50,
    height: 50
  }
});
