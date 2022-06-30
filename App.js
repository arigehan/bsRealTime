import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryLine, VictoryChart } from "victory-native";
//const { google } = require('googleapis'); //ADD
//const request = require('request'); //ADD
//const cors = require('cors'); //ADD
//const urlParse = require('url-parse'); //ADD
//const queryParse = require('query-string'); //ADD
//const bodyParser = require('body-parser'); //ADD
//const axios = require('axios');
//var express = require('express');
//var app = express();

// ios client id: 
// 79485309173-tq4rnq6g8vllhguh52grdh2anu7dftq3.apps.googleusercontent.com

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import googleAuth from './screens/googleAuth';

const Stack = createNativeStackNavigator();

function HomeScreen() {

  const [bloodGlucose, setBloodGlucose] = useState(0);
  const [sugarTrend, setSugarTrend] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [bgOne, setBgOne] = useState(0);
  const [bgTwo, setBgTwo] = useState(0);
  const [bgThree, setBgThree] = useState(0);

  //app.use(cors());
  //app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(bodyParser.json());


/* //SLEEP CODE ADDING 6/30 
  const updateSleep = () => {

    app.get('/getSleep', (req, res) => {
      const oauth2Client = new google.auth.OAuth2(
        //client id
        '79485309173-jutqi66l6q5um7abflpsi4t2f0t4o1jr.apps.googleusercontent.com',
        //client secret
        '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',
        //redirect to link
        'http://localhost:3001/sleep'
      );
      const scopes = ['https://www.googleapis.com/auth/fitness.sleep.read', 'https://www.googleapis.com/auth/fitness.activity.read', 'profile', 'email', 'openid'];
    
      const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: JSON.stringify({
          callbackUrl: req.body.callbackUrl,
          userID: req.body.userid
        })
      })
      request(url, (err, response, body) => {
        console.log('error: ', err);
        console.log('statusCode: ', response && response.statusCode);
        res.send({ url });
      })
    });
    
    app.get('/sleep', async (req, res) => {
      const queryURL = new urlParse(req.url);
      const code = queryParse.parse(queryURL.query).code;
    
      const oauth2Client = new google.auth.OAuth2(
        //client id
        '79485309173-jutqi66l6q5um7abflpsi4t2f0t4o1jr.apps.googleusercontent.com',
        //client secret
        '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',
        //redirect to link
        'http://localhost:3001/sleep'
      );
    
      const {tokens} = await oauth2Client.getToken(code);
      //console.log(tokens, 'token');
      res.send('You Google Fit Account has been connected');
      
      try {
        axios.get('https://fitness.googleapis.com/fitness/v1/users/me/sessions?activityType=72&includeDeleted=true&startTime=2022-06-19T23%3A20%3A50.52Z', {
          headers: {authorization: 'Bearer ' + tokens.access_token},
        })
          .then(response => {
          data = response.data
          console.log(data)

          setSleep(data[0].activityType)
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.status)
              console.log(error.message)
            } else {
              console.log(error.message)
              console.log(error.data)
            }
          })
      } catch (e) {
        console.log(e);
      }
   })

  };

  useEffect(() => {
    updateSleep();
    const timer = setInterval(() => {
      updateSleep();
    }, 30000)

    return () => clearInterval(timer);

  }, [])
*/

 //Get Blood GLucoe (working)
  const updateSGV = () => {
    axios.get('http://cgmari.herokuapp.com/api/v1/entries/current', {
      headers: {'API-SECRET': '80f33cadfe0ec3aa14574a4aa078a48ca4764a2b'},
    })
      .then(response => {
        console.log(response.data)
        let data = response.data

        setBloodGlucose(data[0].sgv);
        setSugarTrend(data[0].trend);
      })
      .catch(error => {
        if (error.response) {
          //get HTTP error code
          console.log(error.response.status)
          console.log(error.message)
          console.log(error)
        } else {
          console.log(error.message)
        }
      })
  };

  var trendLine;
  if (sugarTrend === 1) {
    trendLine = 'Going Up Fast (i think, 1)';
  } else if (sugarTrend === 2) {
    trendLine = 'Going Up (i think, 2)'
  } else if (sugarTrend === 3) {
    trendLine = 'Slightly Going Up'
  } else if (sugarTrend === 4) {
    trendLine = 'Flat'
  } else if (sugarTrend === 5) {
    trendLine = 'Slightly Going Down'
  } else if (sugarTrend === 6) {
    trendLine = 'Going Down'
  } else if (sugarTrend === 7) {
    trendLine = 'Going Down Fast (i think, 7)'
  } else {
    trendLine = 'Unknown';
  };

  const graphData = [
    { quarter: 15, earnings: bgThree },
    { quarter: 10, earnings: bgTwo },
    { quarter: 5, earnings: bgOne },
    { quarter: 0, earnings: bloodGlucose }
  ];

  useEffect(() => {
    const toggle = setInterval(() => {
      setBgThree(bgTwo);
      setBgTwo(bgOne);
      setBgOne(bloodGlucose);
    }, 3000000);
    return () => clearInterval(toggle);
  })


  useEffect(() => {
    updateSGV();
    const timer = setInterval(() => {
      updateSGV();
    }, 3000000)

    return () => clearInterval(timer);

  }, [])

  return (
    <View style={styles.container}>
      
      <Text style={{ fontSize: 30, color: '#1f95bd' }}>Should say 72?</Text>
      <Text style={{ fontSize: 50, color:'#08518e' }}>{bloodGlucose}</Text>

      <Text style={{ fontSize: 30, color: '#1f95bd' }}>Current Blood Glucose:</Text>
      <Text style={{ fontSize: 50, color:'#08518e' }}>{bloodGlucose}</Text>
      <Text style={{ fontSize: 30, color: '#1f95bd' }}>{trendLine}</Text>
      <StatusBar style="auto" />

      <VictoryChart maxDomain={{ y: 250 }} minDomain={{ y: 40 }}>
       <VictoryLine data={graphData} x="quarter" y="earnings"/>
      </VictoryChart>

    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="GoogleAuth" component={googleAuth} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
