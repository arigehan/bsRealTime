import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VictoryLine, VictoryChart } from "victory-native";

export default function sugarGraph() {

    const [bloodGlucose, setBloodGlucose] = useState(0);
    const [sugarTrend, setSugarTrend] = useState(0);
    const [bgOne, setBgOne] = useState(0);
    const [bgTwo, setBgTwo] = useState(0);
    const [bgThree, setBgThree] = useState(0);
  
    const updateSGV = () => {
        //so after asking for google account for sleep data,
        //ask for them to type in herokuapp username (cgmari) and API-SECRET
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
      }, 300000);
      return () => clearInterval(toggle);
    })
  
  
    useEffect(() => {
      updateSGV();
      const timer = setInterval(() => {
        updateSGV();
      }, 300000)
  
      return () => clearInterval(timer);
  
    }, [])
  
    return (
      <View style={styles.container}>
        
        <Text style={{ fontSize: 30, color: '#1f95bd' }}>Current Blood Glucose:</Text>
        <Text style={{ fontSize: 50, color:'#08518e' }}>{bloodGlucose}</Text>
        <Text style={{ fontSize: 30, color: '#1f95bd' }}>{trendLine}</Text>
  
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
  