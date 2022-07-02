import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VictoryLine, VictoryChart } from "victory-native";
import { useRoute } from '@react-navigation/native'

export default function sugarGraph({ navigation }) {

    const [bloodGlucose, setBloodGlucose] = useState(0);
    const [sugarTrend, setSugarTrend] = useState(0);
    const [bgOne, setBgOne] = useState(0);
    const [bgTwo, setBgTwo] = useState(0);
    const [bgThree, setBgThree] = useState(0);
  
    const updateSGV = () => {
      axios.get(`http://${route.params.nsUserName}.herokuapp.com/api/v1/entries/current`, { //cgmari
        headers: {'API-SECRET': route.params.nsApiKey} //'80f33cadfe0ec3aa14574a4aa078a48ca4764a2b'
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
  
    var trendLine; // names of trend 
    if (sugarTrend === 1) {
      trendLine = 'Going Up Fast';
    } else if (sugarTrend === 2) {
      trendLine = 'Going Up'
    } else if (sugarTrend === 3) {
      trendLine = 'Slightly Going Up'
    } else if (sugarTrend === 4) {
      trendLine = 'Flat'
    } else if (sugarTrend === 5) {
      trendLine = 'Slightly Going Down'
    } else if (sugarTrend === 6) {
      trendLine = 'Going Down'
    } else if (sugarTrend === 7) {
      trendLine = 'Going Down Fast'
    } else {
      trendLine = 'Unknown';
    };
  
    const graphData = [ //array for data points of graph, y is time since that reading 
      { quarter: 15, earnings: bgThree },
      { quarter: 10, earnings: bgTwo },
      { quarter: 5, earnings: bgOne },
      { quarter: 0, earnings: bloodGlucose }
    ];
  
    useEffect(() => { //creates blood data for chart, updates every 5 minutes 
      const toggle = setInterval(() => {
        setBgThree(bgTwo);
        setBgTwo(bgOne);
        setBgOne(bloodGlucose);
      }, 320000);
      return () => clearInterval(toggle);
    })
  
    useEffect(() => { //collects and refreshes data every 5 minutes
      updateSGV();
      const timer = setInterval(() => {
        updateSGV();
      }, 320000)
  
      return () => clearInterval(timer);
  
    }, [])
  
    const route = useRoute(); // allows you to get import the NS username and api key from connectNS.js 

    function navToSettings() {
        navigation.navigate('Settings')
    }

    return (
      <View style={styles.container}>

        <Button 
         title="Settings"
         onPress={navToSettings}
        />
        
        <Text style={{ fontSize: 30, color: '#1f95bd' }}>Current Blood Glucose:</Text>
        <Text style={{ fontSize: 50, color:'#08518e' }}>{ bloodGlucose }</Text>
        <Text style={{ fontSize: 30, color: '#1f95bd' }}>{ trendLine }</Text>
  
        <VictoryChart maxDomain={{ y: 250 }} minDomain={{ y: 40 }}>
         <VictoryLine data={graphData} x="quarter" y="earnings"/>
        </VictoryChart>
  
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  