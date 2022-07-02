import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function connectNS({ navigation }) {

  const [nsUserName, setNsUserName] = useState('');
  const [nsApiKey, setNsApiKey] = useState('');

  function navToSugar() {
    navigation.navigate('SugarGraph', {
        nsUserName: nsUserName,
        nsApiKey: nsApiKey
    });
  }

  return (
    <View style={styles.container}>
       <Text>Connect to your Night Scout Account:</Text>
       <Text>Your username can be found in your Heroku App URL</Text>
       <TextInput
        style={styles.input}
        placeholder="Night Scout Username"
        onChangeText={newText => setNsUserName(newText)}
        defaultValue={nsUserName}
      />
      <Text>Your API Secret was made when you created your Night Scout account</Text>
      <TextInput
        style={styles.input}
        placeholder="API Key"
        onChangeText={newText => setNsApiKey(newText)}
        defaultValue={nsApiKey}
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
