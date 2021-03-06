import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { VictoryScatter, VictoryChart, VictoryLabel, VictoryAxis } from "victory-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

//NOTIFICATION 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function SugarGraph({ navigation }) {

  //Pulling data from settings
  const [lowNotify, setLowNotify] = useState('80');
  const [lowAlarm, setLowAlarm] = useState('65');
  const [lowAlarmTone, setLowAlarmTone] = useState('../assets/pianoNotification.mp3');
  const [highNotify, setHighNotify] = useState('200');
  const [highAlarm, setHighAlarm] = useState('250');
  const [highAlarmTone, setHighAlarmTone] = useState('../assets/dingNotification.wav');
  const [timeToggle, setTimeToggle] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [sessionID, setSessionID] = useState(0);

  useEffect(() => { //this isn't automatically updated!!! fix
    async function getValues() {
      try {
        const highNotify = await AsyncStorage.getItem('highNotify');
        if (highNotify !== null) {
          setHighNotify(JSON.parse(highNotify));
        }   
        const highAlarm = await AsyncStorage.getItem('highAlarm');
        if (highAlarm !== null) {
          setHighAlarm(JSON.parse(highAlarm));
        }                  
        const highAlarmTone = await AsyncStorage.getItem('highAlarmTone');
        if (highAlarmTone !== null) {
          setHighAlarmTone(JSON.parse(highAlarmTone));
        }          
        const lowNotify = await AsyncStorage.getItem('lowNotify');
        if (lowNotify !== null) {
          setLowNotify(JSON.parse(lowNotify));
        }
        const lowAlarm = await AsyncStorage.getItem('lowAlarm');
        if (lowAlarm !== null) {
          setLowAlarm(JSON.parse(lowAlarm));
        }         
        const lowAlarmTone = await AsyncStorage.getItem('lowAlarmTone');
        if (lowAlarmTone !== null) {
          setLowAlarmTone(JSON.parse(lowAlarmTone));
        } 
        const timeToggle = await AsyncStorage.getItem('timeToggle');
        if (timeToggle !== null) {
          setTimeToggle(JSON.parse(timeToggle));
        }         
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken !== null) {
          setAccessToken(JSON.parse(accessToken));
        }                    
        const sessionID = await AsyncStorage.getItem('sessionID');
        if (sessionID !== null) {
          setSessionID(JSON.parse(sessionID));
        }            
      } catch (error) {
        // Error retrieving data
      }
    }
    
    getValues();

    const unsubscribe = navigation.addListener('focus', () => {
      getValues();
    });
    return () => {
      unsubscribe;
    };

  }, []);

  //NOTIFICATION 
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

    
    //SLEEP CONTENT

    const [currentSleepStage, setCurrentSleepStage] = useState(' ');
    const [sleepOne, setSleepOne] = useState(' ');
    const [sleepTwo, setSleepTwo] = useState(' ');
    const [sleepThree, setSleepThree] = useState(' ');
    const [sleepFour, setSleepFour] = useState(' ');
    const [sleepFive, setSleepFive] = useState(' ');
    const [sleepSix, setSleepSix] = useState(' ');
    const [sleepSeven, setSleepSeven] = useState(' ');
    const [sleepEight, setSleepEight] = useState(' ');
    const [sleepNine, setSleepNine] = useState(' ');

    var rawDay = new Date().getDate(); 
    if (rawDay < 10) {
      var day = '0' + rawDay.toString();
    } else {
      var day = rawDay.toString();
    }
    var rawMonth = new Date().getMonth() + 1; 
    if (rawMonth < 10) {
      var month = '0' + rawMonth.toString();
    } else {
      var month = rawMonth.toString();
    }
    var rawYear = new Date().getFullYear(); 
    var year = rawYear.toString();

    var rawHours = new Date().getHours();
    if (rawHours < 10) {
      var hours = '0' + rawHours.toString();
    } else {
      var hours = rawHours.toString();
    } 
    var rawMin = new Date().getMinutes();
    if (rawMin < 10) {
      var min = '0' + rawMin.toString();
    } else {
      var min = rawMin.toString();
    } 
    var rawSec = new Date().getSeconds();
    if (rawSec < 10) {
      var sec = '0' + rawSec.toString();
    } else {
      var sec = rawSec.toString();
    } 

    var fullDate = year + '-' + month + '-' + day;

    const updateSleep = () => {
      axios.get(`https://api.fitbit.com/1.2/user/-/sleep/date/2022-07-19/${fullDate}.json`, {
        headers: {'Authorization': `Bearer ${accessToken}`} 
      })
        .then(response =>  {
          console.log(JSON.stringify(response.data));
          let datas = response.data;
  
          setCurrentSleepStage(datas.sleep[0].levels.data[0].level); //displayed furthest right on the graph, even though it is the first sleep stage in the session
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
  
    }, [accessToken]);  

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
    };

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
    const [timeO, setTimeO] = useState(0);
    const [timeOne, setTimeOne] = useState(0);
    const [timeTwo, setTimeTwo] = useState(0);
    const [timeThree, setTimeThree] = useState(0);
    const [timeFour, setTimeFour] = useState(0);
    const [timeFive, setTimeFive] = useState(0);
    const [timeSix, setTimeSix] = useState(0);
    const [timeSeven, setTimeSeven] = useState(0);
    const [timeEight, setTimeEight] = useState(0);
    const [timeNine, setTimeNine] = useState(0);
      
    const updateSugar = () => {
      axios.post(`https://share2.dexcom.com/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues?sessionId=${sessionID}&minutes=150&maxCount=12`, { //Count=1 is how many values you get, you can just get 3 so you don't need all the stupid saves!
        headers: {} 
      })
        .then(response => {
          console.log(response.data);
          let data = response.data;
                 
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
          setTimeO(data[0].WT);
          setTimeOne(data[1].WT);
          setTimeTwo(data[2].WT);
          setTimeThree(data[3].WT);
          setTimeFour(data[4].WT);
          setTimeFive(data[5].WT);
          setTimeSix(data[6].WT);
          setTimeSeven(data[7].WT);
          setTimeEight(data[8].WT);
          setTimeNine(data[9].WT);
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

    const sendNotification = () => {
      if (bloodGlucose >= parseInt(highNotify)) { 
        console.log('sending high notify');
        sendHighNotification(expoPushToken);
      } else if (bloodGlucose <= parseInt(lowNotify) && bloodGlucose !== 0) {
        sendLowNotification(expoPushToken);
      }
    };

    var numberPattern = /\d+/g;
    var ntimeO = `${timeO}`.match( numberPattern );
    var ntimeOne = `${timeOne}`.match( numberPattern );
    var ntimeTwo = `${timeTwo}`.match( numberPattern );
    var ntimeThree = `${timeThree}`.match( numberPattern );
    var ntimeFour = `${timeFour}`.match( numberPattern );
    var ntimeFive = `${timeFive}`.match( numberPattern );
    var ntimeSix = `${timeSix}`.match( numberPattern );
    var ntimeSeven = `${timeSeven}`.match( numberPattern );
    var ntimeEight = `${timeEight}`.match( numberPattern );
    var ntimeNine = `${timeNine}`.match( numberPattern );
  
    var graphData = [ //array for data points of graph, y is time since that reading 
      { time: ntimeO, sugar: bloodGlucose, amount: 1, color: sleepColor(currentSleepStage), stage: currentSleepStage },
      { time: ntimeOne, sugar: bgOne, amount: 1, color: sleepColor(sleepOne), stage: sleepOne },
      { time: ntimeTwo, sugar: bgTwo, amount: 1, color: sleepColor(sleepTwo), stage: sleepTwo },
      { time: ntimeThree, sugar: bgThree, amount: 1, color: sleepColor(sleepThree), stage: sleepThree },
      { time: ntimeFour, sugar: bgFour, amount: 1, color: sleepColor(sleepFour), stage: sleepFour },
      { time: ntimeFive, sugar: bgFive, amount: 1, color: sleepColor(sleepFive), stage: sleepFive },
      { time: ntimeSix, sugar: bgSix, amount: 1, color: sleepColor(sleepSix), stage: sleepSix },
      { time: ntimeSeven, sugar: bgSeven, amount: 1, color: sleepColor(sleepSeven), stage: sleepSeven },
      { time: ntimeEight, sugar: bgEight, amount: 1, color: sleepColor(sleepEight), stage: sleepEight },
      { time: ntimeNine, sugar: bgNine, amount: 1, color: sleepColor(sleepNine), stage: sleepNine },
    ];
    
    useEffect(() => {
      console.log("GRAPH DATA:")
      console.log(graphData);
    }, [graphData]);

    useEffect(() => { //collects and refreshes data every 5 minutes
      updateSugar();
      const timer = setInterval(() => {
        updateSugar();
      }, 320000) //320000 is 5 minutes
      return () => clearInterval(timer);
    }, [sessionID]);
    
    useEffect(() => { //triggers notification when you get new bs value or the push token
      sendNotification();
    }, [bloodGlucose, expoPushToken]); 
          
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

    function msToTime(s) {
      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hours = (s - mins) / 60;

      while (hours >= 24) {
        var hours = hours - 24;
      }

      //probably still needs to be fixed
      if (timeToggle === true) {        
        var hrs = hours - 4;
      } else {
          if (hours >= 13) {
            var hrs = hours - 16;
          }
          else {
            var hrs = hours - 4;
          }
      }

      while (hrs <= 0) {
        if (timeToggle === true) {        
          hrs = hrs + 24;
        } else {
          hrs = hrs + 12;
        }
      }

      if (mins < 10) {
        return hrs + ':0' + mins;
      }
      else {
        return hrs + ':' + mins;
      }
    }

    //ALARM TONE 
    const [sound, setSound] = React.useState();

    async function playHighSound() {
      console.log('Loading Sound');
      //need to add else if statements for each alarm tone option you add
      if (highAlarmTone === '../assets/pianoNotificaion.mp3') {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/pianoNotification.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
        await Audio.setAudioModeAsync({ 
          playsInSilentModeIOS: true,
          interruptionModeAndroid: 1,
          InterruptionModeIOS: 1,
          playThroughEarpieceAndroid: true,
          staysActiveInBackground: true
        }); 
      } else {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/dingNotification.wav') //ding is high default, thus else statment 
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
        await Audio.setAudioModeAsync({ 
          playsInSilentModeIOS: true,
          interruptionModeAndroid: 1,
          InterruptionModeIOS: 1,
          playThroughEarpieceAndroid: true,
          staysActiveInBackground: true
        }); 
      }
    }

    async function playLowSound() {
      console.log('Loading Sound');
      //need to add else if statements for each alarm tone option you add
      if (lowAlarmTone === '../assets/dingNotification.wav') {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/dingNotification.wav')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
        await Audio.setAudioModeAsync({ 
          playsInSilentModeIOS: true,
          interruptionModeAndroid: 1,
          InterruptionModeIOS: 1,
          playThroughEarpieceAndroid: true,
          staysActiveInBackground: true
        }); 
      } else {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/pianoNotification.mp3') //piano is low default, thus else statment 
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
        await Audio.setAudioModeAsync({ 
          playsInSilentModeIOS: true,
          interruptionModeAndroid: 1,
          InterruptionModeIOS: 1,
          playThroughEarpieceAndroid: true,
          staysActiveInBackground: true
        }); 
      }
    }

    React.useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);  

      
    useEffect(() => { //triggers alarm when you get new bs value or alarm value (this is why it kinda plays the wrong one first...)
      if (bloodGlucose >= parseInt(highAlarm)) {
        playHighSound();
      } else if (bloodGlucose <= parseInt(lowAlarm) && bloodGlucose !== 0) {
        playLowSound();
      }
    }, [lowAlarm, highAlarm, bloodGlucose]);  

  return (
      <View style={styles.container}>
            <Text>low alarm: {lowAlarm}</Text>
            <Text>low tone: {lowAlarmTone}</Text>
            <Text>high alarm: {highAlarm}</Text>
            <Text>high tone: {highAlarmTone}</Text>
        <Text style={{ fontSize: 30, color: '#1f95bd' }}>Current Blood Glucose:</Text>
        <Text style={{ fontSize: 50, color:'#08518e' }}>{ bloodGlucose }</Text>
        <Text style={{ fontSize: 30, color: '#1f95bd' }}>{ sugarTrendDisplay }</Text>

        <VictoryChart maxDomain={{ y: 300 }} minDomain={{ y: 39 }}>
          <VictoryAxis dependentAxis />
          <VictoryScatter
            style={{ data: { fill:  ({ datum }) => datum.color }, labels: { fill: "#08518e", fontSize: 16 } }} 
            bubbleProperty="amount" 
            minBubbleSize={15} 
            data={graphData} 
            x="time" 
            y="sugar"
            labels={() => 'true'}
            labelComponent={
              <VictoryLabel
                y={280}
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
                        return props.text === ' ' ?
                        { text: ({ datum }) => [datum.sugar, datum.stage] } : { text: ' ' };
                      }
                    }
                  ];
                }
              }
            }]}
          />
          <VictoryAxis
            tickValues={[ntimeO, ntimeThree, ntimeSix, ntimeNine]}
            tickFormat={(t) => `${msToTime(t)}`}
            style={{
              tickLabels: {fontSize: 15, padding: 29}
            }}
          />
        </VictoryChart>

        <TouchableOpacity onPress={navToSettings}>
          <View>
            <Image
              style={styles.image}
              source = {require('../assets/settings.png')}
            />
          </View>
        </TouchableOpacity>
            
        <TouchableOpacity onPress={navToSettings}>
          <Text>Alarm Settings</Text>
        </TouchableOpacity>

      </View>

    );
  };

//NOTIFICATION
async function sendHighNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: '../assets/pianoNotification.mp3',
    title: 'High Blood Sugar Notification',
    body: 'Your sugar is elevated',
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function sendLowNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Low Blood Sugar Notification',
    body: 'Your sugar is low',
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


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
    rowContainer: {
      flexDirection: 'row',
      position: 'absolute'
    },
  });
  