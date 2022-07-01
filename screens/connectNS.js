import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function connectNS({ navigation }) {

  var nsUserName, nsApiKey; 

  function navToSugar() {
    navigation.navigate('SugarGraph');
  }

  return (
    <View style={styles.container}>
       <Text>Connect to your Night Scout Account:</Text>
       <Text>Your username can be found in your Heroku App URL</Text>
       <TextInput
        style={styles.input}
        value={nsUserName}
        placeholder="Night Scout Username"
      />
      <Text>Your API Secret was made when you created your Night Scout account</Text>
      <TextInput
        style={styles.input}
        value={nsApiKey}
        placeholder="API Key"
      />
      <Button 
       title="Connect"
       onPress={navToSugar}
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
