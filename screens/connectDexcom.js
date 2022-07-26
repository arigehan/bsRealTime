import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function ConnectDexcom({ navigation }) {

  const route = useRoute();
  const [dexcomUserName, setDexcomUserName] = useState('');
  const [dexcomPassword, setDexcomPassword] = useState('');
  const [sessionID, setSessionID] = useState(0);
  var validID = false;
  var validationText;

  //NEW

  useEffect(() => {
    async function getValues() {
      try {
        const sessionID = await AsyncStorage.getItem('sessionID');
        if (sessionID !== null) {
          // We have data!!
          setLowNotify(JSON.parse(sessionID));
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    
    getValues();

  }, [])

  function saveValues() {
    AsyncStorage.setItem('sessionID', JSON.stringify(sessionID))
    .catch((e) => {
      console.log('Error: ' + JSON.stringify(e));
    })

    navToSettings();
  }

  //END OF NEW
  
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

    function navToSettings() {
      navigation.navigate('Settings', {
          dexcomUserName: dexcomUserName,
          dexcomPassword: dexcomPassword,
          sessionID: sessionID,
          accessToken: route.params.accessToken
      });
  }

  if (sessionID && sessionID !== '00000000-0000-0000-0000-000000000000') {
    validID = true;
    validationText = 'Login Successful'
  } else if (!sessionID) {
    validID = false;
    validationText = ' '
  } else {
    validID = false;
    validationText = 'Incorrect Login Information'
  }

  return (
    <View style={styles.container}>

      <Text/>
      <Text/>
      <Text/>
      <Text/>
      <Image
        style ={{width: '66.2%', height: '8%'}}
        source = {require('../assets/Dexcom-logo.png')}
      />
      <Text/>
      <Text/>
      <Text/>
      <Text style={styles.titleText}>Step Two (of Two):</Text>
      <Text style={styles.titleText}>Connect your blood sugar data</Text>
      <Text/> 
      <Text style={styles.text}>All you need to do is log in to your Dexcom account.</Text>
      <Text style={styles.smallBreakText}> </Text>
      <Text style={styles.validationText}>{validationText}</Text>
      <Text style={styles.smallBreakText}> </Text>
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

      <TouchableOpacity style={styles.button} onPress={validID ? saveValues : getSessionID}>
        <Text style={styles.buttonText}>{validID ? "Continue" : "Connect"}</Text>
      </TouchableOpacity>

      <Text/>
      <Text/>

      <Text>Session ID: {sessionID}</Text>
 
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  titleText: {
    fontSize: 25,
    lineHeight: 33,
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: 'black',
  },
  text: {
    fontSize: 17,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'black',
  },
  smallBreakText: {
    fontSize: 5,
    color: 'black',
  },
  validationText: {
    fontSize: 17,
    lineHeight: 21,
    letterSpacing: 0.25,
    fontWeight: 'bold',
    color: 'black',
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
  }
});
