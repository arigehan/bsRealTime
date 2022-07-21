import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ navigation }) {

  const [lowNotify, setLowNotify] = useState(80);
  const [lowAlarm, setLowAlarm] = useState(65);
  const [highNotify, setHighNotify] = useState(200);
  const [highAlarm, setHighAlarm] = useState(250);

  // Load in the settings from storage on app load
  useEffect(() => {
    async function getValues() {
      try {
        const lowNotifyVal = await AsyncStorage.getItem('lowNotify');
        if (lowNotifyVal !== null) {
          // We have data!!
          setLowNotify(JSON.parse(lowNotifyVal));
        }
  
        const lowAlarmVal = await AsyncStorage.getItem('lowAlarm');
        if (lowAlarmVal !== null) {
          // We have data!!
          setLowAlarm(JSON.parse(lowAlarmVal));
        }
  
        const highNotifyVal = await AsyncStorage.getItem('highNotify');
        if (highNotifyVal !== null) {
          // We have data!!
          setHighNotify(JSON.parse(highNotifyVal));
        }
  
        const highAlarmVal = await AsyncStorage.getItem('highAlarm');
        if (highAlarmVal !== null) {
          // We have data!!
          setHighAlarm(JSON.parse(highAlarmVal));
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    
    getValues();

  }, [])

  function saveValues() {
    AsyncStorage.setItem('lowNotify', JSON.stringify(lowNotify))
    .catch((e) => {
      console.log('Error: ' + JSON.stringify(e));
    })

    AsyncStorage.setItem('lowAlarm', JSON.stringify(lowAlarm))
    .catch((e) => {
      console.log('Error: ' + JSON.stringify(e));
    })

    AsyncStorage.setItem('highNotify', JSON.stringify(highNotify))
    .catch((e) => {
      console.log('Error: ' + JSON.stringify(e));
    })

    AsyncStorage.setItem('highAlarm', JSON.stringify(highAlarm))
    .catch((e) => {
      console.log('Error: ' + JSON.stringify(e));
    })

    navToSugar();
  }

  function navToSugar() {

    navigation.navigate('SugarGraph');
  }

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
 
        <Pressable style={styles.button} onPress={saveValues}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>

        <Text/> 
        <Text/> 

        <Text>Low Settings:</Text>
        <View style={styles.SquareShapeView}>
            <Text>Low Notification (mg/dL)</Text>
            <TextInput
                style={styles.input}
                value={lowNotify}
                onChangeText={newText => setLowNotify(newText)}
                keyboardType="numeric"
            />
            <Text>Low Alarm (mg/dL)</Text>
            <TextInput
                style={styles.input}
                value={lowAlarm}
                onChangeText={newText => setLowAlarm(newText)}
                keyboardType="numeric"
            />
            <Text>Low Alarm Tone</Text>
            <TextInput //CHANGE THIS
                style={styles.input}
                placeholder="Ongoing Beeps"
            />
        </View>

        <Text/> 
        <Text/>

        <Text>High Settings:</Text>
        <View style={styles.SquareShapeView}>
            <Text>High Notification (mg/dL)</Text>
            <TextInput
                style={styles.input}
                value={highNotify}
                onChangeText={newText => setHighNotify(newText)}
                keyboardType="numeric"
            />
            <Text>High Alarm (mg/dL)</Text>
            <TextInput
                style={styles.input}
                value={highAlarm}
                onChangeText={newText => setHighAlarm(newText)}
                keyboardType="numeric"
            />
            <Text>High Alarm Tone</Text>
            <TextInput //change this!!!
                style={styles.input}
                placeholder="Bells"
            />
        </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  SquareShapeView: {
    width: 330,
    height: 120,
    backgroundColor: '#88cde0',
  },
  button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#88cde0',
  },
  buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
  }
});
