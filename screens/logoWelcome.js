import * as React from 'react';
import { useState, useEffect } from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoWelcome({ navigation }) {

    function navToFitbitAuth() {
      navigation.navigate('FitbitAuth')
    }

    function navToSugar() {
        navigation.navigate('SugarGraph')
        saveValues();
    }

    //API Request to get dexcom session id
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


    const [dexcomUserName, setDexcomUserName] = useState('');
    const [dexcomPassword, setDexcomPassword] = useState('');
    const [sessionID, setSessionID] = useState(0);
    const [accessToken, setAccessToken] = useState();
    var validID = false;

    //pull dexcom log in and fitbit access token from storage
    useEffect(() => {
        async function getValues() {
          try {
            const dexcomUserName = await AsyncStorage.getItem('dexcomUserName');
            if (dexcomUserName !== null) {
              setDexcomUserName(JSON.parse(dexcomUserName));
            }            
            const dexcomPassword = await AsyncStorage.getItem('dexcomPassword');
            if (dexcomPassword !== null) {
              setDexcomPassword(JSON.parse(dexcomPassword));
            }
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                setAccessToken(JSON.parse(accessToken));
            }            
          } catch (error) {
            // Error retrieving data
          }
        }
        
        getValues();
    
      }, [])

      useEffect(() => {
        getSessionID();
      }, [dexcomPassword]);

      //save new sessionID
      function saveValues() {
        AsyncStorage.setItem('sessionID', JSON.stringify(sessionID))
        .catch((e) => {
          console.log('Error: ' + JSON.stringify(e));
        })
      }

    if (sessionID && sessionID !== '00000000-0000-0000-0000-000000000000' && accessToken) {
        validID = true;
    } else if (!sessionID) {
        validID = false;
    } else {
        validID = false;
    } //if you need to refresh the access token from fitbit: else if (!accessToken) {REFRESH}


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
            <Text/>
            <Text>{sessionID}</Text>
            <Text>{dexcomPassword}</Text>
            <Text>{dexcomUserName}</Text>
            <Text>{accessToken}</Text>
            <Text>{validID ? 'true' : 'false'}</Text>
            <Text/>
            <Text/>
            <Text/>
            <Text/>
            <Image
                style ={{width: '100%', height: '14%'}}
                source = {require('../assets/DaiaLogoGifLong.gif')}
            />
            <Text/>
            <Text/>
            <Text style={styles.subTitle}>Live Better</Text>
            <Text/>
            <Text/>
            <Text/>
            <TouchableOpacity style={styles.button} onPress={ validID ? navToSugar : navToFitbitAuth}>
                <Text style={styles.text}>Start</Text>
            </TouchableOpacity>
            <Text/>
            <Text/>
            <Text/>
            <Text/>
            <Text/>
            <Text/>
            <Text/>
            <Text/>
            <Text/>
            <Text/>
            <Text/>
            <TouchableOpacity style={styles.button} onPress={navToFitbitAuth}>
                <Text style={styles.text}>(Force to FitBit)</Text>
            </TouchableOpacity>
            <Text/>
            <Text/>
            <Text/>
            <Text/>
            <Text/>
            <Text/>

        </View>
    );
};

const styles = StyleSheet.create({
    container :{
        alignContent:'center',
        margin:1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subTitle : {
        fontWeight: 'bold',
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
})