import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

export default function connectDexcom({ navigation }) {

  const [dexcomUserName, setDexcomUserName] = useState('');
  const [dexcomPassword, setDexcomPassword] = useState('');
  const [sessionID, setSessionID] = useState(0);
  var validID = false;
  var validationText;
  
  async function getSessionID() {
    var data = {
      "accountName" : dexcomUserName,
      "applicationId" : "d8665ade-9673-4e27-9ff6-92db4ce13d13",
      "password" : dexcomPassword  
    };

    var config = {
      method: 'post',
      url: 'https://share2.dexcom.com/ShareWebServices/Services/General/LoginPublisherAccountByName',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      let data = response.data
      setSessionID(data)
    })
    .catch(function (error) {
      console.log(error);
    });
    }

    function navToSugar() {
      navigation.navigate('SugarGraph', {
          dexcomUserName: dexcomUserName,
          dexcomPassword: dexcomPassword,
          sessionID: sessionID
      });
  }

  if (sessionID && sessionID !== '00000000-0000-0000-0000-000000000000') {
    validID = true;
    validationText = 'Login Successful'
  } else if (!sessionID) {
    validID = false;
  } else {
    validID = false;
    validationText = 'Incorrect Loging Information'
  }

  return (
    <View style={styles.container}>

      <Text>Connect to your Dexcom Account:</Text>
      <Text>Log in to your Clarity account to confirm these are correct.</Text>
      <TextInput
        style={styles.input}
        placeholder="Dexcom Username"
        onChangeText={newText => setDexcomUserName(newText)}
        defaultValue={dexcomUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={newText => setDexcomPassword(newText)}
        defaultValue={dexcomPassword}
      />

      <Button 
       title={validID ? "Continue" : "Connect"}
       onPress={validID ? navToSugar : getSessionID}
      />

      <Text>Session ID: {sessionID}</Text>
      <Text>{validationText}</Text>

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
