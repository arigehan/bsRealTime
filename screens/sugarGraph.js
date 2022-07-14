import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { VictoryScatter, VictoryChart } from "victory-native";
import { useRoute } from '@react-navigation/native'

export default function sugarGraph({ navigation }) {
    
  //BLOOD SUGAR CONTENT

    const [bloodGlucose, setBloodGlucose] = useState(0);
    const [sugarTrend, setSugarTrend] = useState(0);
    const [bgOne, setBgOne] = useState(0);
    const [bgTwo, setBgTwo] = useState(0);
    const [bgThree, setBgThree] = useState(0);
    const [bgFour, setBgFour] = useState(0);
    const [bgFive, setBgFive] = useState(0);
    const [bgSix, setBgSix] = useState(0);
    const [bgSeven, setBgSeven] = useState(0);
    const [bgEight, setBgEight] = useState(0);
    const [bgNine, setBgNine] = useState(0);

    const updateSugar = () => {
      axios.post(`https://share2.dexcom.com/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues?sessionId=${route.params.sessionID}&minutes=150&maxCount=12`, { //Count=1 is how many values you get, you can just get 3 so you don't need all the stupid saves!
        headers: {} 
      })
        .then(response => {
          console.log(response.data)
          let data = response.data
                 
          setBloodGlucose(data[0].Value);
          setSugarTrend(data[0].Trend);
          setBgOne(data[1].Value);
          setBgTwo(data[2].Value);
          setBgThree(data[3].Value);
          setBgFour(data[4].Value);
          setBgFive(data[5].Value);
          setBgSix(data[6].Value);
          setBgSeven(data[7].Value);
          setBgEight(data[8].Value);
          setBgNine(data[9].Value);
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

    useEffect(() => {
      console.log("GRAPH DATA:")
      console.log(graphData);
    }, [graphData])

    var graphData = [ //array for data points of graph, y is time since that reading 
      { time: 0, sugar: bloodGlucose, amount: 1 },
      { time: 5, sugar: bgOne, amount: 1 },
      { time: 10, sugar: bgTwo, amount: 1 },
      { time: 15, sugar: bgThree, amount: 1 },
      { time: 20, sugar: bgFour, amount: 1 },
      { time: 25, sugar: bgFive, amount: 1 },
      { time: 30, sugar: bgSix, amount: 1 },
      { time: 35, sugar: bgSeven, amount: 1 },
      { time: 40, sugar: bgEight, amount: 1 },
      { time: 45, sugar: bgNine, amount: 1 },
    ];
  
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

    var sugarTrendDisplay;
    if (sugarTrend === 'Flat') {
      sugarTrendDisplay = 'Steady';
    } else if (sugarTrend === 'FortyFiveUp') {
      sugarTrendDisplay = 'Going Up Slightly';
    } else if (sugarTrend === 'FortyFiveDown') {
      sugarTrendDisplay = 'Going Down Slightly';
    } else if (sugarTrend === 'SingleUp') {
      sugarTrendDisplay = 'Going Up';
    }else if (sugarTrend === 'SingleDown') {
      sugarTrendDisplay = 'Going Down';
    } else if (sugarTrend === 'DoubleUp') {
      sugarTrendDisplay = 'Going Up Fast';
    } else if (sugarTrend === 'DoubleDown') {
      sugarTrendDisplay = 'Going Down Fast';
    } else {
      sugarTrendDisplay = 'Trend Unknown';
    }


    //SLEEP CONTENT

    const [currentSleepStage, setCurrentSleepStage] = useState('Unavailible');
    const [previousSleepStage, setPreviousSleepStage] = useState('Unavailible');
  
    const updateSleep = () => {
      axios.get('https://api.fitbit.com/1.2/user/-/sleep/date/2022-07-13/2022-07-14.json', {
        headers: {'Authorization': `Bearer ${route.params.accessToken}`} 
      })
        .then(response =>  {
          console.log(JSON.stringify(response.data));
          let datas = response.data;
  
          setCurrentSleepStage(datas.sleep[0].levels.data[0].level);
          setPreviousSleepStage(datas.sleep[0].levels.data[3].level); 
   
          // sleep[what day from the range you want data from, 0 is most recent day]
          // data[what sleep stage data you want from this sleep session]
        })
        .catch(error => {
          if (error.response) {
            console.log(error)
          } else {
            console.log(error.message)
          }
        })
    };
  
    useEffect(() => { //collects and refreshes data every 5 minutes
      updateSleep();
      const timer = setInterval(() => {
        updateSleep();
      }, 320000)
  
      return () => clearInterval(timer);
  
    }, [])  

    //Make this a function, return the color 
    var currentBackColor = '#f7db9f';
    if (currentSleepStage === 'awake') {
      currentBackColor = '#89d7e3';
    } else if (currentSleepStage === 'light') {
      currentBackColor = '#198cbb';
    } else if (currentSleepStage === 'deep') {
      currentBackColor = '#0d6da9';
    } else if (currentSleepStage === 'restless') {
      currentBackColor = '#3db3d4';
    } else if (currentSleepStage === 'rem') {
      currentBackColor = '#163c66';
    } else if (currentSleepStage === 'wake') {
      currentBackColor = '#ebf2f0';
    } else {
      currentBackColor = '#f7db9f';
    }

    var previousBackColor = '#f7db9f';
    if (previousSleepStage === 'awake') {
      previousBackColor = '#89d7e3';
    } else if (previousSleepStage === 'light') {
      previousBackColor = '#198cbb';
    } else if (previousSleepStage === 'deep') {
      previousBackColor = '#0d6da9';
    } else if (previousSleepStage === 'restless') {
      previousBackColor = '#3db3d4';
    } else if (previousSleepStage === 'rem') {
      previousBackColor = '#163c66';
    } else if (previousSleepStage === 'wake') {
      previousBackColor = '#ebf2f0';
    } else {
      previousBackColor = '#f7db9f';
    }

    return (
      <View style={styles.container}>

        <View style={styles.rowContainer}>
          <View style={styles.currentColor} backgroundColor={currentBackColor} >
            <Text>{route.params.currentSleepStage}</Text>
          </View>

          <View style={styles.previousColor} backgroundColor={previousBackColor} >
            <Text>{route.params.previousSleepStage}</Text>
          </View>
        </View>  

        <Text style={{ fontSize: 30, color: '#1f95bd' }}>Current Blood Glucose:</Text>
        <Text style={{ fontSize: 50, color:'#08518e' }}>{ bloodGlucose }</Text>
        <Text style={{ fontSize: 30, color: '#1f95bd' }}>{ sugarTrendDisplay }</Text>

        <VictoryChart maxDomain={{ x: 45, y: 250 }} minDomain={{ x: 0, y: 40 }} >
          <VictoryScatter
            style={{ data: { fill: "#08518e" }, labels: { fill: "black", fontSize: 16 } }} 
            bubbleProperty="amount" 
            minBubbleSize={10} 
            data={graphData} 
            x="time" 
            y="sugar"
            //labels={({ datum }) => datum.sugar}
            // events={[{
            //   target: "data",
            //   eventHandlers: {
            //     onPress: () => {
            //       return [
            //         {
            //           target: "labels",
            //           mutation: (props) => {
            //             //return props.text === 'hi' ?
            //             return props.text === datum.sugar ?
            //             //null : { text: 'hi' };
            //             null : { text: ({ datum }) => datum.sugar };
            //           }
            //         }
            //       ];
            //     }
            //   }
            // }]}
          />
        </VictoryChart>

        <TouchableHighlight onPress={navToSettings}>
          <View>
            <Image
              style={styles.image}
              source = {require('../assets/settings.png')}
            />
          </View>
        </TouchableHighlight>
        
        <TouchableHighlight onPress={navToSettings}>
          <Text>Alarm Settings</Text>
        </TouchableHighlight>
        <Text/>
        <Text/>
        <Text/>

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
    image: {
      height: 40,
      width: 40,
    },
    overlayView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    currentColor: {
      width: 33,
      height: 216,
      borderRadius: 7
    },
    previousColor: {
      width: 33,
      height: 216,
      borderRadius: 7
    },
    rowContainer: {
      flexDirection: 'row',
      position: 'absolute'
    }
  });
  