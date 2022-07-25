import * as React from 'react';
import { useState, useEffect } from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoWelcome({ navigation }) {

    function navToFitbitAuth() {
      navigation.navigate('FitbitAuth')
    }

    function navToSugar() {
        navigation.navigate('SugarGraph', {
            accessToken: accessToken,
            sessionID: sessionID,
            timeToggle: timeToggle
        })
    }

    const [sessionID, setSessionID] = useState('00000000-0000-0000-0000-000000000000');
    const [accessToken, setAccessToken] = useState();
    const [timeToggle, setTimeToggle] = useState();

    useEffect(() => {
        async function getValues() {
          try {
            const sessionID = await AsyncStorage.getItem('sessionID');
            if (sessionID !== null) {
              setSessionID(JSON.parse(sessionID));
            }
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken !== null) {
                setAccessToken(JSON.parse(accessToken));
            }            
            const timeToggle = await AsyncStorage.getItem('timeToggle');
            if (timeToggle !== null) {
                setTimeToggle(JSON.parse(timeToggle));
            }
          } catch (error) {
            // Error retrieving data
          }
        }
        
        getValues();
    
      }, [])



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

            <TouchableOpacity style={styles.button} onPress={navToFitbitAuth}>
                <Text style={styles.text}>Click Here To Start</Text>
            </TouchableOpacity>

            <Text/>

            <TouchableOpacity style={styles.button} onPress={ (sessionID && accessToken) ? navToSugar : navToFitbitAuth}>
                <Text style={styles.text}>Click Here To Return</Text>
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
            <Text/>
            <Text/>
            <Text/>
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