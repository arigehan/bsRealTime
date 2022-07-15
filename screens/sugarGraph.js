import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { VictoryScatter, VictoryChart, VictoryLabel } from "victory-native";
import { DefaultTheme, useRoute } from '@react-navigation/native'

export default function sugarGraph({ navigation }) {
    
    //SLEEP CONTENT

    const [currentSleepStage, setCurrentSleepStage] = useState('Unavailible');
    const [sleepOne, setSleepOne] = useState('Unavailible');
    const [sleepTwo, setSleepTwo] = useState('Unavailible');
    const [sleepThree, setSleepThree] = useState('Unavailible');
    const [sleepFour, setSleepFour] = useState('Unavailible');
    const [sleepFive, setSleepFive] = useState('Unavailible');
    const [sleepSix, setSleepSix] = useState('Unavailible');
    const [sleepSeven, setSleepSeven] = useState('Unavailible');
    const [sleepEight, setSleepEight] = useState('Unavailible');
    const [sleepNine, setSleepNine] = useState('Unavailible');
  
    const updateSleep = () => {
      axios.get('https://api.fitbit.com/1.2/user/-/sleep/date/2022-07-13/2022-07-14.json', {
        headers: {'Authorization': `Bearer ${route.params.accessToken}`} 
      })
        .then(response =>  {
          console.log(JSON.stringify(response.data));
          let datas = response.data;
  
          setCurrentSleepStage(datas.sleep[0].levels.data[0].level);
          setSleepOne(datas.sleep[0].levels.data[1].level); 
          setSleepTwo(datas.sleep[0].levels.data[2].level); 
          setSleepThree(datas.sleep[0].levels.data[3].level); 
          setSleepFour(datas.sleep[0].levels.data[4].level); 
          setSleepFive(datas.sleep[0].levels.data[5].level); 
          setSleepSix(datas.sleep[0].levels.data[6].level); 
          setSleepSeven(datas.sleep[0].levels.data[7].level); 
          setSleepEight(datas.sleep[0].levels.data[8].level); 
          setSleepNine(datas.sleep[0].levels.data[9].level); 
   
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

    const sleepColor = (sleepState) => {
      var backColor;
      if (sleepState === 'awake') {
        backColor = '#89d7e3';
      } else if (sleepState === 'light') {
        backColor = '#198cbb';
      } else if (sleepState === 'deep') {
        backColor = '#0d6da9';
      } else if (sleepState === 'restless') {
        backColor = '#3db3d4';
      } else if (sleepState === 'rem') {
        backColor = '#163c66';
      } else if (sleepState === 'wake') {
        backColor = '#ebf2f0';
      } else if (sleepState === 'asleep') {
        backColor = '#d0efee';
      } else {
        backColor = '#f7db9f';
      }
      return backColor;
    }

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
      { time: 0, sugar: bloodGlucose, amount: 1, color: sleepColor(currentSleepStage), stage: currentSleepStage },
      { time: 5, sugar: bgOne, amount: 1, color: sleepColor(sleepOne), stage: sleepOne },
      { time: 10, sugar: bgTwo, amount: 1, color: sleepColor(sleepTwo), stage: sleepTwo },
      { time: 15, sugar: bgThree, amount: 1, color: sleepColor(sleepThree), stage: sleepThree },
      { time: 20, sugar: bgFour, amount: 1, color: sleepColor(sleepFour), stage: sleepFour },
      { time: 25, sugar: bgFive, amount: 1, color: sleepColor(sleepFive), stage: sleepFive },
      { time: 30, sugar: bgSix, amount: 1, color: sleepColor(sleepSix), stage: sleepSix },
      { time: 35, sugar: bgSeven, amount: 1, color: sleepColor(sleepSeven), stage: sleepSeven },
      { time: 40, sugar: bgEight, amount: 1, color: sleepColor(sleepEight), stage: sleepEight },
      { time: 45, sugar: bgNine, amount: 1, color: sleepColor(sleepNine), stage: sleepNine },
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

    return (
      <View style={styles.container}>

        {/* <View style={styles.rowContainer}>
          <View style={styles.sleepBox} backgroundColor={sleepColor(currentSleepStage)} >
            <Text>{currentSleepStage}</Text>
          </View>
          <View style={styles.sleepBox} backgroundColor={sleepColor(sleepOne)} >
            <Text>{sleepOne}</Text>
          </View>        
          <View style={styles.sleepBox} backgroundColor={sleepColor(sleepTwo)} >
            <Text>{sleepTwo}</Text>
          </View>
          <View style={styles.sleepBox} backgroundColor={sleepColor(sleepThree)} >
            <Text>{sleepThree}</Text>
          </View>
          <View style={styles.sleepBox} backgroundColor={sleepColor(sleepFour)} >
            <Text>{sleepFour}</Text>
          </View>
          <View style={styles.sleepBox} backgroundColor={sleepColor(sleepFive)} >
            <Text>{sleepFive}</Text>
          </View>
          <View style={styles.sleepBox} backgroundColor={sleepColor(sleepSix)} >
            <Text>{sleepSix}</Text>
          </View>
          <View style={styles.sleepBox} backgroundColor={sleepColor(sleepSeven)} >
            <Text>{sleepSeven}</Text>
          </View>
          <View style={styles.sleepBox} backgroundColor={sleepColor(sleepEight)} >
            <Text>{sleepEight}</Text>
          </View>
          <View style={styles.sleepBox} backgroundColor={sleepColor(sleepNine)} >
            <Text>{sleepNine}</Text>
          </View>
        </View>   */}

        <Text style={{ fontSize: 30, color: '#1f95bd' }}>Current Blood Glucose:</Text>
        <Text style={{ fontSize: 50, color:'#08518e' }}>{ bloodGlucose }</Text>
        <Text style={{ fontSize: 30, color: '#1f95bd' }}>{ sugarTrendDisplay }</Text>

        <VictoryChart maxDomain={{ x: 45, y: 250 }} minDomain={{ x: 0, y: 40 }} >
          <VictoryScatter
            style={{ data: { fill:  ({ datum }) => datum.color }, labels: { fill: "#08518e", fontSize: 16 } }} 
            bubbleProperty="amount" 
            minBubbleSize={15} 
            data={graphData} 
            x="time" 
            y="sugar"
            labels={true}
            labelComponent={
              <VictoryLabel
                y={270}
                dy={(({ datum }) => datum.sugar)}
                text= ' '
                verticalAnchor={({ text }) => text.length > 1 ? "start" : "middle"}
                />
            }
             events={[{
              target: "data",
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      target: "labels",
                      mutation: (props) => {
                        return props.text === null ?
                        { text: null } : { text: ({ datum }) => [datum.sugar, datum.stage] };
                      }
                    }
                  ];
                }
              }
            }]}
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
    sleepBox: {
      width: 32, //32 or 29
      height: 216,
      borderRadius: 7
    },
    rowContainer: {
      flexDirection: 'row',
      position: 'absolute'
    }
  });
  