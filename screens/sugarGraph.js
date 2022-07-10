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

    const updateSugar = () => {
      axios.post(`https://share2.dexcom.com/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues?sessionId=${route.params.sessionID}&minutes=1440&maxCount=1`, { //cCount=1 is how many values you get, you can just get 3 so you don't need all the stupid saves!
        headers: {} 
      })
        .then(response => {
          console.log(response.data)
          let data = response.data
  
          setBloodGlucose(data[0].Value);
          setSugarTrend(data[0].Trend);
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
      updateSugar();
      const timer = setInterval(() => {
        updateSugar();
      }, 320000)
  
      return () => clearInterval(timer);
  
    }, [])
  
    const route = useRoute(); // allows you to get import the Dexcom username and password from connectDexcom.js 

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
        <Text style={{ fontSize: 30, color: '#1f95bd' }}>{ sugarTrend }</Text>
  
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
  