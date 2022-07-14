import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function sleepDisplay({ navigation }) {

  const route = useRoute();
  const [currentSleepStage, setCurrentSleepStage] = useState('Unable to Fetch Sleep Data');
  const [previousSleepStage, setPreviousSleepStage] = useState('Unable to Fetch Sleep Data');

  const updateSleep = () => {
    axios.get('https://api.fitbit.com/1.2/user/-/sleep/date/2022-07-07/2022-07-08.json', {
      headers: {'Authorization': `Bearer ${route.params.accessToken}`} 
    })
      .then(response =>  {
        console.log(JSON.stringify(response.data));
        let datas = response.data;

        setCurrentSleepStage(datas.sleep[0].levels.data[1].level);
        setPreviousSleepStage(datas.sleep[1].levels.data[0].level); 
 
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

  function navToNS() {
    navigation.navigate('ConnectDexcom', {accessToken: accessToken});
  }


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

     
      <Button
        title="Refresh"
        onPress={() => updateSleep}
      />

      <Text>   </Text>

      <View style={styles.rowContainer}>
        <View style={styles.currentColor} backgroundColor={currentBackColor} >
          <Text>{currentSleepStage}</Text>
        </View>

        <View style={styles.previousColor} backgroundColor={previousBackColor} >
          <Text>{previousSleepStage}</Text>
        </View>
      </View>

      <Text>   </Text>
      <Text>   </Text>

      <Button
          title="Continue"
          onPress={() => navToNS()}
        />

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentColor: {
    width: 150,
    height: 120,
  },
  previousColor: {
    width: 150,
    height: 120
  },
  rowContainer: {
    flexDirection: 'row'
  }
});

