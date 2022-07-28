import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { VictoryScatter, VictoryChart, VictoryLabel, VictoryAxis } from "victory-native";
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//NOTIFICATION 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function SugarGraph({ navigation }) {

  //Pulling data from settings
  const [lowNotify, setLowNotify] = useState('80');
  const [highNotify, setHighNotify] = useState('200');
  const [timeToggle, setTimeToggle] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [sessionID, setSessionID] = useState(0);

  useEffect(() => {
    async function getValues() {
      try {
        const highNotify = await AsyncStorage.getItem('highNotify');
        if (highNotify !== null) {
          setHighNotify(JSON.parse(highNotify));
        }            
        const lowNotify = await AsyncStorage.getItem('lowNotify');
        if (lowNotify !== null) {
          setLowNotify(JSON.parse(lowNotify));
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

  }, [])

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

    const updateSleep = () => {
      axios.get('https://api.fitbit.com/1.2/user/-/sleep/date/2022-07-19/2022-07-20.json', {
        headers: {'Authorization': `Bearer ${accessToken}`} 
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
      if (bloodGlucose >= highNotify) { 
        console.log('sending high notify');
        sendHighNotification(expoPushToken);
      } else if (bloodGlucose <= lowNotify && bloodGlucose !== 0) {
        sendLowNotification(expoPushToken);
      }
    }

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

    return (
      <View style={styles.container}>
            <Text>{sessionID}</Text>
            <Text>{highNotify}</Text>
            <Text>{accessToken}</Text>
        {/* 
        <View style={styles.rowContainer}>
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
    sound: 'default',
    title: 'High Blood Sugar Notification',
    body: 'Your sugar is elevated',
  };

  let res = await fetch('https://exp.host/--/api/v2/push/send', {
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
    },
  });
  